
const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

const useref = require('gulp-useref');
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');
const cssnano = require('cssnano');
const imagemin = require('gulp-imagemin');
const  cache = require('gulp-cache');


const del = require('del');


const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

const  runSequence = require('run-sequence');



gulp.task('sass', function() {
	return gulp.src('app/scss/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({
			stream: true
		}))
});


gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'app'
		}
	})
});

gulp.task('watch', ['browserSync', 'sass'], function() {
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('app/*.html', browserSync.reload); 
	gulp.watch('app/js/**/*.js', browserSync.reload); 
});


gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpif('*.js', uglify()))
   // .pipe(gulpif('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('autoprefixer' , function() {
	return gulp.src('app/*/**.css')
	.pipe(postcss([ autoprefixer(), cssnano() ]))
	.pipe(gulp.dest('dist'))
});

gulp.task('images', function() {
	return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
	.pipe(cache(imagemin({
		interlaced: true
	})))
	.pipe(gulp.dest('dist/images'))
});


gulp.task('fonts', function() {
	return gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'))
});

// delete dist folder //
gulp.task('clean:dist', function() {
	return del.sync('dist');
});

gulp.task('build', function(callback) {
	runSequence('clean:dist',
		['sass', 'useref', 'autoprefixer','images', 'fonts'],
		callback)
})
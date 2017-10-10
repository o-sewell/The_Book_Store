
	const endpoint = 'https://www.googleapis.com/books/v1/volumes?q=HTML5';

	function getBooks() {
		return fetch(endpoint)
		  	.then(blob => blob.json())
		  	.then(data => data.items)
	}

	getBooks().then(booksArray => {
		displayBooks(booksArray)
		displayFeatured(booksArray)
		isSelected();
	});

	function displayBooks(booksArray) {
		//map through each book
		const html = booksArray.map((book) => {
			let bookSubTitle = book.volumeInfo.subtitle;
			// if book doesn't have a title 
			if(book.volumeInfo.subtitle === undefined) {
				bookSubTitle = '';
			}
			let bookDesc = book.volumeInfo.description;
			if (bookDesc!=undefined) {
			   //if the variable is not undefined you can use substr with no problems
			    bookDesc  = book.volumeInfo.description.substring(0,140);
			}
			return `
				<div class="book">
					<div class="book__image">
						<img src="${book.volumeInfo.imageLinks.thumbnail}"/>
					</div>
					<div class="book__info">
						<p class="book__title">${book.volumeInfo.title}</p>
						<p class="book__subtitle">${bookSubTitle}</p>
						<p class="book__authors"><span class="highlight">Author:</span> ${book.volumeInfo.authors}</p>
						<p class="book__pages"><span class="highlight">Pages:</span> ${book.volumeInfo.pageCount}</p>
						<p class="book_description">${bookDesc}</p>
					</div>
				</div>
			`
		}).join('');
		
		const booksContainer = document.querySelector('.books');
		booksContainer.innerHTML = html;
	}

	function displayFeatured(booksArray) {
		const last2Books = booksArray.slice(-2);
		const html = last2Books.map((book) => {
			let bookSubTitle = book.volumeInfo.subtitle;
			// if book doesn't have a title 
			if(book.volumeInfo.subtitle === undefined) {
				bookSubTitle = '';
			}
			// book description 14 characters 
			let bookDesc = book.volumeInfo.description;
			if (bookDesc!=undefined) {
			   //if the variable is not null you can use substr with no problems
			    bookDesc  = book.volumeInfo.description.substring(0,140);
			}
			return `
				<div class="featured-book">
						<img src="${book.volumeInfo.imageLinks.thumbnail}"/>
						<p class="book__title">${book.volumeInfo.title}</p>
						<p class="book__subtitle">${bookSubTitle}</p>
						<p class="book__authors"><span class="highlight">Author:</span> ${book.volumeInfo.authors}</p>
						<p class="book__pages"><span class="highlight">Pages:</span> ${book.volumeInfo.pageCount}</p>
						<p class="book_description">${bookDesc}</p>
				</div>
			`
		}).join('');

		const featuredContainer = document.querySelector('.featured');
		featuredContainer.innerHTML = html

	}


function isSelected() {
	//Array.isArray(books) //=> false
	//books.constructor.name //=> HTMLCollection
	const books = document.getElementsByClassName('book');
	//html collection so need to change into an array
	const booksArray = Array.from(books);
	console.log(booksArray);
	booksArray.forEach((book,index) => {
		book.addEventListener('click',(eventObj) =>{
			eventObj.currentTarget.classList.toggle('is-selected')
		})
		//localStorage.setItem('books', JSON.stringify(book));
	})

}

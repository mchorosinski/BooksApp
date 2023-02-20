{
  'use strict';

  const select = {
    templateOf: {
      bookList: '#template-book',
    },
    containerOf: {
      list: '.books-list', // "." kropka to dziecko
    },
    elementOf: {
      bookElem: '.book__image', // cover image
      filter: '.filters',
    },
  };

  const className = {
    favoriteBookClass: 'favorite',
    hidden: 'hidden',
  };

  const templates = {
    bookList: Handlebars.compile(document.querySelector(select.templateOf.bookList).innerHTML),
  };

  const favoriteBooks = [];

  const filters = [];


  class BookList {

    constructor(id, data) {

      const thisBookList = this;

      thisBookList.id = id;
      thisBookList.data = data;
      //console.log('id:', id);
      //console.log('data:', data);

      thisBookList.initData();
      thisBookList.initActions();
      thisBookList.filterBooks();
      thisBookList.determineRatingBgc();
    }

    initData() {
      const thisBookList = this;
      thisBookList.data = dataSource.books;

      for (const book of thisBookList.data) {
        const thisBookList = this;

        book.ratingBgc = thisBookList.determineRatingBgc(book.rating);
        console.log('book.rating:', book.rating);

        const ratingWidth = book.rating * 10;
        console.log('ratingWidth:', ratingWidth);

        //console.log('thisBookList.data:', thisBookList.data);

        /* [DONE] generate HTML based on template */

        const generatedHTML = templates.bookList(book);
        //console.log('generatedHTML:', generatedHTML);

        /* [DONE] create element using utils.createElementFromHTML */

        thisBookList.element = utils.createDOMFromHTML(generatedHTML);
        //console.log('thisBookList.element:', thisBookList.element);

        /* [DONE] find list container */

        const listContainer = document.querySelector(select.containerOf.list);
        //console.log('listContainer:', listContainer);

        /* [DONE] add element to list */

        listContainer.appendChild(thisBookList.element);
      }
    }

    initActions() {
      const thisBookList = this;

      /* FAVORITE BOOK START */

      /* find list container */

      const listContainer = document.querySelector(select.containerOf.list); // list: '.books-list'

      /* add listener to the list container */

      listContainer.addEventListener('dblclick', function (event) {
        event.preventDefault();
        //console.log(this);

        /* variable of the clicked element */

        let book = event.target.offsetParent; // to jest "event delegation" - Technika ta polega na tym, że zamiast nasłuchiwać na pojedyncze elementy, nasłuchuje się na jeden kontener.
        // Właśnie ten, w którym te elementy są przechowywane. W takiej sytuacji JS obserwuje tylko jeden kontener.
        // Dopiero kiedy wykryje, że dany event się wydarzył, określa się już konkretnie, na którym elemencie doszło do działania (np. kliknięcia).

        /* add class 'favorite' to the clicked element */

        if (book.classList.contains('book__image')) {

          book.classList.toggle(className.favoriteBookClass);

          /* get an id of the book from image's attribute 'data-id' */ //<a href="#" class="book__image" data-id="{{ id }}">

          const bookId = book.getAttribute('data-id');

          console.log('bookId:', bookId);

          /* add a book to favorite */

          if (favoriteBooks.includes(bookId)) {
            const list = favoriteBooks;
            const indexId = list.indexOf(bookId);
            list.splice(indexId, 1);
          }
          else {
            favoriteBooks.push(bookId);
          }
        }
      });
      /* FAVORITE BOOK END */

      /* FILTER BOOK START */

      const filterElem = document.querySelector(select.elementOf.filter); // '.filters'

      filterElem.addEventListener('click', function (event) {
        console.log('Clicked');

        let filter = event.target; // to jest 'event delegation'

        if(filter.tagName == 'INPUT' && filter.type == 'checkbox' && filter.name == 'filter') {
          console.log('Value', filter.value);
          if(filter.checked == true) {
            filters.push(filter.value);
            console.log('Filters Array:', filters);
          } else if(filters.includes(filter.value)) {
            const indexOfFilter = filters.indexOf(filter.value);
            console.log('indexOfFilter:', indexOfFilter);

            if(indexOfFilter > -1){
              filters.splice(indexOfFilter, 1);
              console.log('Filters Array Updated', filters);
            }
          }
        }
        thisBookList.filterBooks(); // funkcja ta wywołuje się każdorazowo przy zmianie checkboxa w formularzu.
      });

      /* FILTER BOOK END */
    }

    filterBooks() {

      const booksToCheck = dataSource.books;

      for(let book of booksToCheck) {
        let shouldBeHidden = false;

        for(const filter of filters) {
          if(!book.details[filter]) { // nazwa właściwości do sprawdzenia jest równa wartości filter, a zatem: czy dana właściwość, której nazwa to wartość filter jest false
            shouldBeHidden = true;
            break; // `break` to przerwanie działania pętli
          }
        }

        if(shouldBeHidden === true) {
          const bookCover = document.querySelector('[data-id="' + book.id + '"]');
          bookCover.classList.add(className.hidden);
        } else {
          const bookCover = document.querySelector('[data-id="' + book.id + '"]');
          bookCover.classList.remove(className.hidden);
          //console.log('bookCover:', bookCover);
        }
      }
    }

    determineRatingBgc(rating) {
      let ratingBgc = '';

      if(rating < 6) {
        ratingBgc = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      }

      if(rating > 6 && rating <= 8) {
        ratingBgc = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      }

      if(rating > 8 && rating <= 9) {
        ratingBgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      }

      if(rating > 9) {
        ratingBgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
      return ratingBgc;
      //return(thisBookList.determineRatingBgc(rating));
    }
  }
  new BookList();
}
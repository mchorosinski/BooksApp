{
  'use strict';

  const select = {
    templateOf: {
      bookList: '#template-book',
    },
    containerOf: {
      list: 'books-list',
    },
  };

  const templates = {
    bookList: Handlebars.compile(document.querySelector(select.templateOf.bookList).innerHTML),
  };


  class BookList {

    constructor(id, data) {

      const thisBookList = this;

      thisBookList.id = id;
      thisBookList.data = data;

      thisBookList.render();
    }

    render() {
      const thisBookList = this;
      thisBookList.data = dataSource.books;

      for(const book of this.data) {
        const thisBookList = this;

        console.log('this.data:', this.data);

        /* [DONE] generate HTML based on template */

        const generatedHTML = templates.bookList(book);
        //console.log('generatedHTML:', generatedHTML);

        /* [DONE] create element using utils.createElementFromHTML */

        thisBookList.element = utils.createDOMFromHTML(generatedHTML);
        //console.log('thisBookList.element:', thisBookList.element);

        /* [DONE] find list container */

        const listContainer = document.querySelector(select.containerOf.list);
        console.log('listContainer:', listContainer);

        /* [DONE] add element to list */

        listContainer.appendChild(thisBookList.element);
      }
    }
  }
  new BookList();
}
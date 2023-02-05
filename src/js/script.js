{

  'use strict';

  const select = {
    templateOf: {
      bookList: '#template-book',
    },
    containerOf: {
      list: '#books-list', // .books-list
    },
  };

  function render() {

    const thisBookList = this;

    for(let book of dataSource){

      const templates = {
        bookList: Handlebars.compile(document.querySelector(select.templateOf.bookList).innerHTML),
      };

      /* [DONE] generate HTML based on template */

      const generatedHTML = templates.bookList(book);

      /* [DONE] create element using utils.createElementFromHTML */

      thisBookList.element = utils.createDOMFromHTML(generatedHTML);

      /* [DONE] find list container */

      const listContainer = document.querySelector(select.containerOf.list);

      /* [DONE] add element to list */

      listContainer.appendChild(thisBookList.element);
    }
  }
  render();
}
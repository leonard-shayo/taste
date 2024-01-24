import icons from '../../img/icons.svg';
import View from './view';

class PaginationView extends View {
  _parentContainer = document.querySelector('.pagination');

  _generateMarkup() {
    console.log(this._data);
    const pages = this._data.pages;
    const page = this._data.page;

    //   page 1 and no other pages
    if (page === 1 && pages <= 1) {
      return ``;
    }
    // first page and there is other page
    if (page === 1 && pages > 1) {
      return `<button data-goPage="${
        page + 1
      }" class="btn--inline pagination__btn--next">
            <span>${page + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }
    // between page
    if (page > 1 && page < pages) {
      return `<button data-goPage="${
        page - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}.svg#icon-arrow-left"></use>
            </svg>
            <span>${page - 1}</span>
          </button><button data-goPage="${
            page + 1
          }" class="btn--inline pagination__btn--next">
            <span>${page + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }

    // last page
    if (page === pages && pages >= 1) {
      console.log('last');
      return `<button data-goPage="${
        page - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}.svg#icon-arrow-left"></use>
            </svg>
            <span>${page - 1}</span>
          </button>`;
    }
  }

  addEventHandler(handler) {
    this._parentContainer.addEventListener('click', function (e) {
      e.preventDefault();

      const buttonClicked = e.target.closest('.btn--inline');

      if (!buttonClicked) return;

      const pageToGo = +buttonClicked.dataset.gopage;
      handler(pageToGo);
    });
  }
}

export default new PaginationView();

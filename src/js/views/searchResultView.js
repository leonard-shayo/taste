import View from './view';
import icons from '../../img/icons.svg';

class SearchResultView extends View {
  _parentContainer = document.querySelector('.results');

  _generateMarkup() {
    return this._data.map(
      recipe =>
        `<li class="preview">
        <a class="preview__link preview__link--active" href="#${recipe.id}">
          <figure class="preview__fig">
            <img src="${recipe.image_url}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${recipe.title}</h4>
            <p class="preview__publisher">${recipe.publisher}</p>
            <div class="preview__user-generated">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>`
    );
  }
}

export default new SearchResultView();

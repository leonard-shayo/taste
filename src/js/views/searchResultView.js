import View from './view';
import icons from '../../img/icons.svg';
import * as model from '../model/model';

class SearchResultView extends View {
  _parentContainer = document.querySelector('.results');
  _errorMessage = `Start by searching for a recipe or an ingredient. Have fun!`;

  _generateMarkup() {
    const id = window.location.hash.slice(1);

    return this._data.map(
      recipe =>
        `<li class="preview">
        <a class="preview__link ${
          //   1
          recipe.id === id ? `preview__link--active` : ``
        }" href="#${recipe.id}">
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

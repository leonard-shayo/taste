import icons from '../../img/icons.svg';
import View from './view';

class BookmarkView extends View {
  _parentContainer = document.querySelector('.bookmarks__list');
  _errorMessage = ` No bookmarks yet. Find a nice recipe and bookmark it`;
  _generateMarkup() {
    const id = window.location.hash.slice(1);

    return this._data.map(
      recipe =>
        `<li class="preview">
  <a
    class="preview__link ${
      //   1
      recipe.id === id ? `preview__link--active` : ``
    }"
    href="#${recipe.id}"
  >
    <figure class="preview__fig">
      <img src="${recipe.image_url}" alt="Test" />
    </figure>
    <div class="preview__data">
      <h4 class="preview__title">${recipe.title}</h4>
      <p class="preview__publisher">${recipe.publisher}</p>
    </div>
  </a>
</li>;  `
    );
  }
}

export default new BookmarkView();

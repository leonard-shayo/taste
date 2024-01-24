import icons from '../../img/icons.svg';

export default class View {
  _data = {};

  render(data) {
    this._data = data;
    this._clear();

    const markup = this._generateMarkup();
    // this._parentContainer.innerHTML = '';

    this._parentContainer.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentContainer.innerHTML = '';
  }

  renderSpinner() {
    const spiner = `<div class="spinner">
          <svg>
            <use href="${icons}_icon-loader"></use>
          </svg>
        </div>`;
    this._clear();
    this._parentContainer.insertAdjacentHTML('afterbegin', spiner);
  }

  // description: 'tbsp. canola or olive oil';
  // quantity: 1;
  // unit: '';
}

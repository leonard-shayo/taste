import icons from '../../img/icons.svg';
import View from './view';

class RecipeView extends View {
  _parentContainer = document.querySelector('.recipe');
  _errorMessage = `Start by searching for a recipe or an ingredient. Have fun!`;

  render(data) {
    this._data = data;
    this._clear();

    const markup = this._generateMarkup();
    // this._parentContainer.innerHTML = '';

    this._parentContainer.insertAdjacentHTML('afterbegin', markup);
  }

  // description: 'tbsp. canola or olive oil';
  // quantity: 1;
  // unit: '';

  _generateMarkup() {
    console.log(this._data);
    return ` 
        <figure class="recipe__fig">
          <img src="${this._data.image_url}" alt="Tomato" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this._data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">45</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              this._data.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button data-servings="${
                this._data.servings - 1
              }" class="btn--tiny btn--update-servings">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button data-servings="${
                this._data.servings + 1
              }" class="btn--tiny btn--update-servings">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round bookmarkbtn">
            <svg class="">
              <use href="${icons}#icon-bookmark${
      this._data.isbookmarked ? `-fill` : ``
    }"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${this._data.ingredients
            .map(
              ingredient => `<li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity"> ${ingredient.quantity ?? ''}</div>
              <div class="recipe__description">
                <span class="recipe__unit"> ${ingredient.unit}</span>
                ${ingredient.description}
                
              </div>
            </li>`
            )
            .join('')}
            
 
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              this._data.publisher
            }</span>. Please check out
            directions at their website.
          </p>
        

         <a
            class="btn--small recipe__btn"
            href="${this._data.source_url}"
          target="_blank"
           > 
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
        `;
  }

  // addevent() {
  //   // if (!this._parentContainer.querySelector('.recipe__btn')) {
  //   //   return;
  //   // }

  //   this._parentContainer
  //     .querySelector('.recipe__btn')
  //     ?.addEventListener('click', function (e) {
  //       console.log('mambo');
  //     });
  // }

  addUpdateServingsshandler(handler) {
    this._parentContainer.addEventListener('click', function (e) {
      e.preventDefault();

      const clickedButton = e.target.closest('.btn--update-servings');

      if (!clickedButton) {
        return;
      }

      const newServings = +clickedButton.dataset.servings;

      if (newServings <= 0) return;

      handler(newServings);
    });
  }

  addBookmarkHandler(handler) {
    this._parentContainer.addEventListener(
      'click',
      function (e) {
        e.preventDefault();

        const bookmarkBtn = e.target.closest('.bookmarkbtn');

        if (!bookmarkBtn) return;
        handler(this._data.id);
      }.bind(this)
    );
  }

  eventListener(eventHandler) {
    ['load', 'hashchange'].forEach(event => {
      window.addEventListener(event, eventHandler);
    });
  }
}

export default new RecipeView();

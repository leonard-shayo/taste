import 'core-Js/stable';
import 'regenerator-runtime/runtime.js';

import recipeView from './views/recipeView';
import searchView from './views/searchView';
import searchResultView from './views/searchResultView';
import paginationView from './views/paginationView';

import * as helper from './helper';

import * as model from './model/model';

if (module.hot) {
  module.hot.accept();
}

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

const recipeControl = async function () {
  try {
    const recipeId = window.location.hash.slice(1);
    console.log(recipeId);
    if (!recipeId) {
      return;
    }
    recipeView.renderSpinner();
    await model.searchRecipeDetails(recipeId);

    recipeView.render(model.state.recipe);
  } catch (error) {
    console.log(error);
    // alert(error.message);
  }
};

const searchControl = async function (searchQuery) {
  try {
    console.log(searchQuery);

    searchResultView.renderSpinner();

    await model.searchQueryRecipes(searchQuery);

    searchResultView.render(
      model.state.search.recipes.slice(...helper.startEnd(1))
    );
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
    // alert(error);
  }
};

const paginationControl = function (pageToGo) {
  searchResultView.render(
    model.state.search.recipes.slice(...helper.startEnd(pageToGo))
  );
  model.state.search.page = pageToGo;
  paginationView.render(model.state.search);
};

const updateServingsControl = function (newServings) {
  model.updateServings(newServings);
  recipeView.render(model.state.recipe);
};

function init() {
  recipeView.eventListener(recipeControl);
  searchView.addSearchHandler(searchControl);
  paginationView.addEventHandler(paginationControl);
  recipeView.addUpdateServingsshandler(updateServingsControl);
}

init();

///////////////////////////////////////

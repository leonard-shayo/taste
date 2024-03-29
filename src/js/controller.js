import 'core-js/stable';
import 'regenerator-runtime/runtime.js';

import recipeView from './views/recipeView';
import searchView from './views/searchView';
import searchResultView from './views/searchResultView';
import paginationView from './views/paginationView';
import bookmarkView from './views/bookmarkView';

import * as helper from './helper';

import * as model from './model/model';

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
    if (!recipeId) {
      return;
    }
    recipeView.renderSpinner();

    // retriving bookmarked recipr from local storage
    if (JSON.parse(localStorage.getItem('recipeBookmark'))) {
      model.state.bookmark = JSON.parse(localStorage.getItem('recipeBookmark'));
      bookmarkView.render(model.state.bookmark);
    }

    await model.searchRecipeDetails(recipeId);

    recipeView.render(model.state.recipe);

    // render again the  result view with active selected recipe marked
    searchResultView.render(
      model.state.search.recipes.slice(...model.startEnd())
    );

    // render again the bookmark view with active bookmark recipe
    bookmarkView.render(model.state.bookmark);
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
      model.state.search.recipes.slice(...model.startEnd())
    );
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
    // alert(error);
  }
};

const paginationControl = function (pageToGo) {
  searchResultView.render(
    model.state.search.recipes.slice(...model.startEnd(pageToGo))
  );
  model.state.search.page = pageToGo;
  paginationView.render(model.state.search);
};

const updateServingsControl = function (newServings) {
  model.updateServings(newServings);
  recipeView.render(model.state.recipe);
};

const bookmarkControl = function (recipeId) {
  if (model.state.bookmark.some(recipe => recipe?.id === recipeId)) {
    model.removeToBookmark(recipeId);
    console.log(model.state.bookmark);

    bookmarkView.render(model.state.bookmark);
    recipeView.render(model.state.recipe);
  } else {
    model.addToBookmark(recipeId);
    console.log(model.state.bookmark);

    bookmarkView.render(model.state.bookmark);
    recipeView.render(model.state.recipe);
  }
};

function init() {
  recipeView.eventListener(recipeControl);
  // recipeView.addevent();
  searchView.addSearchHandler(searchControl);
  paginationView.addEventHandler(paginationControl);
  recipeView.addUpdateServingsshandler(updateServingsControl);
  recipeView.addBookmarkHandler(bookmarkControl);
}

init();

///////////////////////////////////////

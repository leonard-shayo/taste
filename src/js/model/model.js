import * as configVariables from '../config.js';
import * as helper from '../helper.js';

export let state = { recipe: {}, search: { recipes: [], pages: 1, page: 1 } };

export const searchRecipeDetails = async function (recipeId) {
  try {
    console.log(recipeId);

    const url = `${configVariables.FORKFY_API_URL}/${recipeId}`;

    const data = await helper.getJson(url);
    console.log(data);
    state.recipe = data.recipe;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const searchQueryRecipes = async function (searchQuery) {
  try {
    const url = `${configVariables.FORKFY_API_URL}?search=${searchQuery}`;
    console.log(url);
    const data = await helper.getJson(url);

    state.search.recipes = data.recipes;
    state.search.pages = Math.ceil(
      data.recipes.length / configVariables.RESULT_PER_PAGE
    );
    console.log(state.search.pages);
  } catch (error) {
    throw error;
  }
};

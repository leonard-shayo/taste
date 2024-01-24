import * as configVariables from './config.js';

export const getJson = async function (url) {
  try {
    const res = await fetch(` ${url}`);
    const { data } = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const startEnd = function (page) {
  const start = (page - 1) * configVariables.RESULT_PER_PAGE;
  const end = page * configVariables.RESULT_PER_PAGE;
  console.log(page);
  return [start, end];
};

/**
 * 
 * @param {string} string 
 * returns string with first letter capitalized
 */
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

/**
* @param {Date} date 
* @returns string in format YYYY-MM-DD
*/
function formatDateToString(date) {
  return date.toISOString().split("T")[0];
}

/**
 * @param {string} url
 * @param {object} options
 * @returns {Promise<any>} as json string or error
 * @throws {Error}
 */
async function fetchData(url, options) {
  try {
    const response = await fetch(url, options);
    return response.json();
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * 
 * @param {string} key 
 * @param {*} value 
 * Adds value to localStorage as json string
 */
function saveToLocalStorage(key, value){
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * 
 * @param {string} key 
 * @returns {object} data as object
 */
function getFromLocalStorage(key){
  try{
  return JSON.parse(localStorage.getItem(key));
  }
  catch(error){
    return null;
  }
}

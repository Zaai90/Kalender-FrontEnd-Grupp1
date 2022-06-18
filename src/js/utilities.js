/**
 * 
 * @param {string} string 
 * @returns string with first letter capitalized
 */
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
* 
* @param {Date} date 
* @returns string in format YYYY-MM-DD
*/
function formatDateToString(date) {
  return date.toISOString().split("T")[0];
}
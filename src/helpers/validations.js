

/**
 * Returns true if number is negative otherwise a string error message is returned
 *
 * @param {number} n
 * @param {boolean} [isRequired=true] - if parameter is not required & not given, pass validation
 * @returns {boolean|string}
 */
async function isNegativeNum(n, isRequired = true) {
  if (!isRequired && !n) {
    return true;
  }
  return (n < 0) || 'Must be a negative number';
}


async function isPositiveNum(n, isRequired = true) {
  if (!isRequired && !n) {
    return true;
  }
  return (n > 0) || 'Must be a positive number';
}


export {
  isNegativeNum,
  isPositiveNum,
};
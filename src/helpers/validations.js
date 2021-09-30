

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
  return (typeof n === 'number' && n < 0) || 'Must be a negative number';
}


async function isPositiveNum(n, isRequired = true) {
  if (!isRequired && !n) {
    return true;
  }
  return (typeof n === 'number' && n > 0) || 'Must be a positive number';
}


async function isOneOrMore(n, isRequired = true) {
  if (!isRequired && !n) {
    return true;
  }
  return (typeof n === 'number' && n >= 1) || 'Must be a at least 1';
}


/**
 * Returns string of form validation error or null if no error
 *
 * @param {object} errors
 * @param {string} recordName - BTC, DOGE, etc.
 * @param {string} fieldKey - 'buyPercentage', 'sellPercentage' etc.
 * @returns
 */
function getRecordError(errors, recordName, fieldKey) {
  // if the field doesn't exist in the .record.BTC.thresholds,
  // check if the key is in .record.BTC.
  if (!Object.keys(errors).length) return null;

  if (errors?.records?.[recordName]?.[fieldKey]) {
    return errors?.records?.[recordName]?.[fieldKey].message;
  }

  if (errors?.records?.[recordName].thresholds?.[fieldKey]) {
    return errors?.records?.[recordName].thresholds?.[fieldKey].message;
  }

  return null;
}


export {
  isNegativeNum,
  isPositiveNum,
  isOneOrMore,
  getRecordError,
};

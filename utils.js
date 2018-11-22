/**
 * Generate a response
 * @param {any} payload 
 * @param {number?} statusCode 
 */
export const respond = function (payload, statusCode = 200) {
  return {
    statusCode,
    body: JSON.stringify({ payload })
  };
};

/**
 * Make body
 * @param {any} body
 */
export const makeBody = function (body, headers) {
  const parsed = {
    method: 'POST',
    headers: Object.assign({ 'Content-Type': 'application/json' }, headers),
    mode: 'cors',
    cache: 'default',
  };
  if (body) {
    parsed.body = JSON.stringify(body);
  }
  return parsed;
};

export const serialize = (obj) => {
  let str = '';
  for (var key in obj) {
      if (str != '') str += '&';
      str += key + '=' + encodeURIComponent(obj[key]);
  }
  return str;
};

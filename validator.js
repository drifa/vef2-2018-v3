function validateTitle(title) {
  if (typeof title === 'string' && title.length > 1 && title.length < 255) {
    return 'Success';
  }
  return 'Title must be a string of length 1 to 255 characters';
}

function validateText(text) {
  if (typeof text === 'string') {
    return 'Success';
  }
  return 'Text must be a string';
}

function validateDatetime(date) {
  const regexISO = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
  if (regexISO.test(date)) {
    return 'Success';
  }
  return 'Datetime must be a ISO 8601 date';
}

exports.validation = (title, text, datetime) => {
  const err = [];

  if (validateTitle(title) !== 'Success') {
    err[err.length] = {
      field: 'title',
      message: validateTitle(title),
    };
  }

  if (validateText(text) !== 'Success') {
    err[err.length] = {
      field: 'text',
      message: validateText(text),
    };
  }

  if (validateDatetime(datetime) !== 'Success') {
    err[err.length] = {
      field: 'datetime',
      message: validateDatetime(datetime),
    };
  }
  return err;
};

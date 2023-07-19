import crypto from 'crypto';
import dayjs from 'dayjs';
import { APIError } from '.';

const SECRET_KEY = 'd6F3Efeq';

export const encrypt = (text) => {
  let cipher = crypto.createCipher('aes-256-cbc', SECRET_KEY);
  let crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
};

export const decrypt = (text) => {
  try {
    let decipher = crypto.createDecipher('aes-256-cbc', SECRET_KEY);
    let dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
  } catch (error) {
    throw new APIError('Invalid token', 403);
  }
};

var BoolArray = [true, false, 'true', 'false', 1, 0, '1', '0'];

export const isBoolean = function (arg) {
  if (BoolArray.indexOf(arg) === -1) {
    return false;
  } else {
    return true;
  }
};

export const isJson = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length;

export const sum = (arr, props) => arr.reduce((p, c) => p + c[props], 0);

export const growthRate = (present, past) => ((present - past) / past) * 100;

export const groupBy = (x, f) =>
  x.reduce((acc, obj) => {
    var key = obj[f];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});

export const generateDateToken = () => {
  let date = dayjs().format('YYYYMMDD');
  let encDate = crypto.createHash('md5').update(date).digest('hex');

  return encDate;
};

export const guessDelimiters = (text, possibleDelimiters = [';', ',']) => {
  return possibleDelimiters.filter(weedOut);

  function weedOut(delimiter) {
    var cache = -1;
    return text.split('\n').every(checkLength);

    function checkLength(line) {
      if (!line) {
        return true;
      }

      var length = line.split(delimiter).length;
      if (cache < 0) {
        cache = length;
      }
      return cache === length && length > 1;
    }
  }
};

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

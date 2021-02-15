// Validators
import isEnum from './isEnum';
import isInt from "./isInt";
import isNumber from "./isNumber";
import isString from './isString';
import required from './required';

// Sanitizers
import toLowerCase from './toLowerCase';
import toUpperCase from './toUpperCase';
import toInt from "./toInt";
import toFloat from "./toFloat";

const validations: any = {
  validators: {
    isEnum,
    isInt,
    isNumber,
    isString,
    required,
  },
  sanitizers: {
    toLowerCase,
    toUpperCase,
    toInt,
    toFloat
  },
};

export default validations;

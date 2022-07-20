import * as validatorLib from 'validator';

// Validators
import isEnum from './isEnum';
import isInt from './isInt';
import isNumber from './isNumber';
import isString from './isString';
import isBoolean from './isBoolean';
import required from './required';

// Sanitizers
import toLowerCase from './toLowerCase';
import toUpperCase from './toUpperCase';
import toInt from './toInt';

const validatorJS = validatorLib.default;

const validations: any = {
  validators: {
    isEnum,
    isInt,
    isNumber,
    isString,
    isBoolean,
    required,

    // validator JS methods
    isISO8601: validatorJS.isISO8601,
    equals: validatorJS.equals,
    contains: validatorJS.contains,
    matches: validatorJS.matches,
    isEmail: validatorJS.isEmail,
    isURL: validatorJS.isURL,
    isMACAddress: validatorJS.isMACAddress,
    isIP: validatorJS.isIP,
    isIPRange: validatorJS.isIPRange,
    isFQDN: validatorJS.isFQDN,
    isIBAN: validatorJS.isIBAN,
    isBIC: validatorJS.isBIC,
    isAlpha: validatorJS.isAlpha,
    isAlphaLocales: validatorJS.isAlphaLocales,
    isAlphanumeric: validatorJS.isAlphanumeric,
    isAlphanumericLocales: validatorJS.isAlphanumericLocales,
    isNumeric: validatorJS.isNumeric,
    isPassportNumber: validatorJS.isPassportNumber,
    isPort: validatorJS.isPort,
    isLowercase: validatorJS.isLowercase,
    isUppercase: validatorJS.isUppercase,
    isAscii: validatorJS.isAscii,
    isFullWidth: validatorJS.isFullWidth,
    isHalfWidth: validatorJS.isHalfWidth,
    isVariableWidth: validatorJS.isVariableWidth,
    isMultibyte: validatorJS.isMultibyte,
    isSemVer: validatorJS.isSemVer,
    isSurrogatePair: validatorJS.isSurrogatePair,
    isHexadecimal: validatorJS.isHexadecimal,
    isOctal: validatorJS.isOctal,
    isDivisibleBy: validatorJS.isDivisibleBy,
    isHexColor: validatorJS.isHexColor,
    isRgbColor: validatorJS.isRgbColor,
    isHSL: validatorJS.isHSL,
    isISRC: validatorJS.isISRC,
    isMD5: validatorJS.isMD5,
    isHash: validatorJS.isHash,
    isJWT: validatorJS.isJWT,
    isJSON: validatorJS.isJSON,
    isEmpty: validatorJS.isEmpty,
    isLength: validatorJS.isLength,
    isLocale: validatorJS.isLocale,
    isByteLength: validatorJS.isByteLength,
    isUUID: validatorJS.isUUID,
    isMongoId: validatorJS.isMongoId,
    isAfter: validatorJS.isAfter,
    isBefore: validatorJS.isBefore,
    isIn: validatorJS.isIn,
    isCreditCard: validatorJS.isCreditCard,
    isIdentityCard: validatorJS.isIdentityCard,
    isEAN: validatorJS.isEAN,
    isISIN: validatorJS.isISIN,
    isISBN: validatorJS.isISBN,
    isISSN: validatorJS.isISSN,
    isMobilePhone: validatorJS.isMobilePhone,
    isMobilePhoneLocales: validatorJS.isMobilePhoneLocales,
    isPostalCode: validatorJS.isPostalCode,
    isPostalCodeLocales: validatorJS.isPostalCodeLocales,
    isEthereumAddress: validatorJS.isEthereumAddress,
    isCurrency: validatorJS.isCurrency,
    isBtcAddress: validatorJS.isBtcAddress,
    isRFC3339: validatorJS.isRFC3339,
    isISO31661Alpha2: validatorJS.isISO31661Alpha2,
    isISO31661Alpha3: validatorJS.isISO31661Alpha3,
    isBase32: validatorJS.isBase32,
    isBase64: validatorJS.isBase64,
    isDataURI: validatorJS.isDataURI,
    isMagnetURI: validatorJS.isMagnetURI,
    isMimeType: validatorJS.isMimeType,
    isLatLong: validatorJS.isLatLong,
    escape: validatorJS.escape,
    unescape: validatorJS.unescape,
    stripLow: validatorJS.stripLow,
    whitelist: validatorJS.whitelist,
    blacklist: validatorJS.blacklist,
    isWhitelisted: validatorJS.isWhitelisted,
    isSlug: validatorJS.isSlug,
    isStrongPassword: validatorJS.isStrongPassword,
    isDate: validatorJS.isDate,
  },
  sanitizers: {
    toLowerCase,
    toUpperCase,
    toInt,

    // validator JS methods
    toFloat: validatorJS.toFloat,
    toDate: validatorJS.toDate,
    toBoolean: validatorJS.toBoolean,
    toString: validatorJS.toString,
    ltrim: validatorJS.ltrim,
    rtrim: validatorJS.rtrim,
    trim: validatorJS.trim,
    normalizeEmail: validatorJS.normalizeEmail,
  },
};

export default validations;

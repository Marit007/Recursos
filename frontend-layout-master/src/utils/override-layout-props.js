/**
 * New layout types map
 */
const layoutTypeMap = {
  full: 'plus',
  lite: 'pluslite',
  clean: 'plusclean',
};

/**
 * Override the layout type if the header 'x-menu-type' is defined.
 * This is a temporary feature only for ML.
 */
function overrideTypeProp(type, headers, cookies) {
  let newType = type;
  if ((headers && headers['x-menu-type'] === 'extended') || (cookies && cookies.force_plus_header === '1')) {
    newType = layoutTypeMap[type] || type;
  }
  return newType;
}

/**
 * Override the fixed prop if the header 'x-menu-type' is defined.
 * This is a temporary feature only for ML.
 */
function overrideFixedProp(typeProp, fixedProp) {
  return typeProp.includes('plus') ? false : fixedProp;
}

/**
 * Expose overrideTypeProp
 */
exports.overrideTypeProp = overrideTypeProp;

/**
 * Expose overrideFixedProp
 */
exports.overrideFixedProp = overrideFixedProp;

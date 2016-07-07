'use strict';

const del = require('del');

module.exports = function clean(options) {

  return function() {
    return del(options.src);
  };

};

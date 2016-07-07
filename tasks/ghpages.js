'use strict';

const gulp = require('gulp');
const ghPages = require('gulp-gh-pages');

module.exports = function ghpages(options) {

  return function() {
    return gulp.src(options.src)
      .pipe(ghPages());
  };

};

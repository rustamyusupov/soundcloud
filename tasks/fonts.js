'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

module.exports = function fonts(options) {

  return function() {
    return gulp.src(options.src , {since: gulp.lastRun(fonts)})
      .pipe($.newer(options.build))
      .pipe($.debug({title: 'fonts'}))
      .pipe(gulp.dest(options.build));
  };

};

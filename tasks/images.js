'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

module.exports = function images(options) {

  return function() {
    return gulp.src(options.src, {since: gulp.lastRun(images)})
      .pipe($.newer(options.build))
      .pipe($.debug({title: 'images'}))
      .pipe($.imagemin({
        optimizationLevel: 5,
        progressive: true
      }))
      .pipe(gulp.dest(options.build));
  };

};

'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const combine = require('stream-combiner2').obj;

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

module.exports = function js(options) {

  return function() {
    return combine(
      gulp.src(options.src),
      $.debug({title: 'js'}),
      $.if(isDev, $.sourcemaps.init()),
      // $.babel(),
      $.concat('script.js'),
      $.if(options.transfer, gulp.dest(options.build)),
      $.if(!isDev, $.uglify()),
      $.rename('script.min.js'),
      $.if(isDev, $.sourcemaps.write()),
      gulp.dest(options.build)
    ).on('error', $.notify.onError(function(err) {
      return {
        title: "javascript compilation error",
        message: err.message
      }
    }));
  };

};

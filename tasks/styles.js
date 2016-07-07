'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const combine = require('stream-combiner2').obj;
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const sorting = require('postcss-sorting');

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

module.exports = function styles(options) {

  return function() {
    return combine(
      gulp.src(options.src),
      $.debug({title: 'styles'}),
      $.if(isDev, $.sourcemaps.init()),
      $.sass({
        outputStyle: 'expanded'
      }),
      $.postcss([
        autoprefixer,
        mqpacker({
          sort: true
        }),
        sorting
      ]),
      $.if(options.transfer, gulp.dest(options.build)),
      $.if(!isDev, $.csso()),
      $.rename('style.min.css'),
      $.debug({title: 'rename:'}),
      $.if(isDev, $.sourcemaps.write()),
      gulp.dest(options.build)
    ).on('error', $.notify.onError(function(err) {
      return {
        title: "styles compilation error",
        message: err.message
      }
    }));
  };

};

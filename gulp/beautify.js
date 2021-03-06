'use strict';

var gulp = require('gulp');
var paths = gulp.paths;
var prettify = require('gulp-jsbeautifier');

/**
 * Beautify HTML
 */
gulp.task('beautify-html', function () {
  gulp.src(paths.html, {
      base: '.'
    })
    .pipe(prettify({
      config: '.jsbeautifyrc'
    }))
    .pipe(gulp.dest('.'));
});

/**
 * Beautify JS
 */
gulp.task('beautify', function () {
  gulp.src(paths.js, {
      base: '.'
    })
    .pipe(prettify({
      config: '.jsbeautifyrc',
      mode: 'VERIFY_AND_WRITE'
    }))
    .pipe(gulp.dest('.'));
});

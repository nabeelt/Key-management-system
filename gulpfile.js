var gulp = require('gulp');


gulp.paths = {
  src: 'www',
  js: ['gulpfile.js', 'gulp/**/*', 'www/*.js', 'www/**/*.js'],
  html: ['www/*.html', 'www/**/*.html'],
};

require('require-dir')('./gulp');
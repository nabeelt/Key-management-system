var gulp = require('gulp');


gulp.paths = {
  src: 'www',
  tmp:'.tmp',
  js: ['gulpfile.js', 'gulp/**/*', 'www/**/*.js', 'www/*.js'],
  html: ['www/*.html', 'www/**/*.html'],
  css: 'www/assets/css/*.css'
};

require('require-dir')('./gulp');
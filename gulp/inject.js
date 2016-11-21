var gulp = require('gulp');
var paths = gulp.paths;
var inject = require('gulp-inject');

gulp.task('buildHtml',['libs','buildJs','buildCss','images','fonts'], function () {
  var target = gulp.src(paths.src +'/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths: 
  var sources = gulp.src(['.tmp/js/libs*.js','.tmp/js/main*.js','.tmp/assets/css/*.css'], {read: false});
 
  return target.pipe(inject(sources,{ignorePath:'.tmp',addRootSlash: false}))
    .pipe(gulp.dest('.tmp'));
});

gulp.task('default', ['buildHtml','libs','buildJs','buildCss','images','fonts']);
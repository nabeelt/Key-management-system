var gulp = require('gulp');
var concat = require('gulp-concat');
var paths = gulp.paths;
var minify = require('gulp-minify');
 
gulp.task('concat-compress', function() {
  return gulp.src(paths.js)
    .pipe(concat('main.js'))
    .pipe(minify({
        ext:{
            // src:'-all.js',
            min:'-min.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['-min.js']
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['concat-compress']);


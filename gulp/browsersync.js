var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var paths = gulp.paths;

// Static server
gulp.task('serve',['buildHtml'], function() {
    browserSync.init({
        server: {
            baseDir: paths.tmp
        }
    });
});
var gulp = require('gulp');
var paths = gulp.paths;
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var manifest = require('gulp-manifest');
var concat = require('gulp-concat');
var del = require("del");
var $ = require('gulp-load-plugins')();

gulp.task('libs', ['clean:libs'],function() {

    // concat and minify js library files
    gulp.src(['bower_components/jquery/dist/jquery.min.js',
        'bower_components/angular/angular.min.js',
        'bower_components/ng-table/bundles/ng-table.min.js',
        'bower_components/angular-datepicker/angular-datepicker.js',
        'bower_components/angular-validation-match/angular-validation-match.js',
        'bower_components/angular/ng-storage.min.js',
        'bower_components/angular-route/angular-route.min.js'
        ])
        .pipe(concat('libs.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(rev()) // Generate hash for minified JS file
        .pipe(gulp.dest(paths.tmp + '/js'))
        .pipe(rev.manifest(manifest, {merge: true, base: paths.tmp})) // Create manifest file
        .pipe(gulp.dest(paths.tmp));
});

gulp.task('buildJs',['clean:js-build'], function() {
    
    // concat and minify js files
    gulp.src([paths.src+'/app.js',
        paths.src+'/components/popup/popup-directive.js',
        paths.src+'/components/popup/popup-controller.js',
        paths.src+'/components/popup/popup.js',
        paths.src+'/components/keys/keys-directive.js',
        paths.src+'/components/keys/keys.js',
        paths.src+'/components/common.js',
        paths.src+'/components/app.route.js',
        paths.src+'/index-controller.js'
        ])
        .pipe(concat('main.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(rev()) // Generate hash for minified JS file
        .pipe(gulp.dest(paths.tmp + '/js'))
        .pipe(rev.manifest(manifest, {merge: true, base: paths.tmp})) // Create manifest file
        .pipe(gulp.dest(paths.tmp));
});

gulp.task('buildCss', function() {
    
    // concat and minify css files
    gulp.src([paths.css,
      'node_modules/ng-table/bundles/ng-table.min.css',
      'node_modules/angular-datepicker/angular-datepicker.css'
      ])
      .pipe(concat('main.min.css'))
      .pipe(rev()) // Generate hash for minified JS file
      .pipe(gulp.dest(paths.tmp + '/assets/css'))
      .pipe(rev.manifest(manifest, {merge: true, base: paths.tmp})) // Create manifest file
      .pipe(gulp.dest(paths.tmp));
});


gulp.task('images', function () {
  return gulp.src(paths.src + '/assets/images/**/*')
    .pipe(gulp.dest(paths.tmp + '/assets/images/'));
});

gulp.task('fonts', function () {
  return gulp.src(paths.src + '/assets/fonts/**/*')
    .pipe(gulp.dest(paths.tmp + '/assets/fonts/'));
});


gulp.task('clean:libs', function () {
  return del([paths.tmp + 'css/main*.css', paths.tmp + 'js/libs*.js',]);
});


gulp.task('clean:js-build', function () {
  return del([
    gulp.tmp + 'js/main*.min.js',
  ]);
});


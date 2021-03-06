var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var del = require('del');
var usemin = require('gulp-usemin');
var rev = require('gulp-rev');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();



gulp.task('previewDist', function () {
      browserSync.init({
          notify: false,
          server: {
              baseDir: "./docs"
          }
      });
  });





gulp.task('deleteDistFolder', function() {
    return del('./docs');
  })

gulp.task('optimizeImages', ['deleteDistFolder'], function () {
    return gulp.src("./img/*")
        .pipe(imagemin({
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest("./docs/img"));
  });


 gulp.task('usemin', ['deleteDistFolder'],function () {
    return gulp.src("./index.html")
        .pipe(usemin({
            css: [function() {return rev()}, function() {return cssnano()}],
            js: [function () {return rev()}, function () {return uglify()} ]
        }))
        .pipe(gulp.dest("./docs"));
  }); 


  gulp.task('build', ['deleteDistFolder',
  'optimizeImages', 'usemin'
]
);

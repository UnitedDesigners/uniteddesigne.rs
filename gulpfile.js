var gulp    = require('gulp'),
    connect = require('gulp-connect'),
    watch   = require('gulp-watch'),
    plumber = require('gulp-plumber'),
    babel   = require('gulp-babel'),
    sass    = require('gulp-sass');

gulp.task('watch:html', function() {
  return watch('*.html')
    .pipe(connect.reload());
});

gulp.task('watch:css', function() {
  return watch('scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./css'))
    .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});

gulp.task('default', ['connect', 'watch:html', 'watch:css']);

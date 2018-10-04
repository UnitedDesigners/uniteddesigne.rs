/* eslint-disable */

var gulp = require('gulp'),
connect = require('gulp-connect')
watch = require('gulp-watch');

gulp.task('html', function() {
  return watch('components/**/*.html', function() {
    gulp.src('components/**/*.html')
      .pipe(connect.reload())
  })
});

gulp.task('js', function() {
  var concat    = require('gulp-concat');
  var babel = require('gulp-babel');
  var plumber = require('gulp-plumber');



  return watch(['vendor/js/**/*.js', 'components/**/*.js'], function() {
    gulp.src(['vendor/js/**/*.js', 'components/**/*.js'])
      .pipe(plumber())
      .pipe(babel({
            presets: ['env'],
            plugins: ["transform-object-rest-spread"]
          }))
      .pipe(concat('main.js'))
      .pipe(gulp.dest('dist/js'))
      .pipe(connect.reload())
  })
});

gulp.task('css', function () {
    var sass = require('gulp-sass');
    var sassGlob = require('gulp-sass-glob');
    var concat    = require('gulp-concat');
    var postcss    = require('gulp-postcss');
    var sourcemaps = require('gulp-sourcemaps');
    var cssnano = require('gulp-cssnano');
    var autoprefixer = require('autoprefixer');
    var colorguard = require('colorguard');
    var precss = require('precss');
    var doiuse = require('doiuse');
    var easyimport = require('postcss-easy-import');
    var plumber = require('gulp-plumber');


    var doiuseOptions = {
        browsers: ['ie >= 10', '> 5%'],
        onFeatureUsage: function(usageInfo) {
          console.log(usageInfo.message);
        }
    };

    var plugins = [
      easyimport(),
      precss(),
      autoprefixer(),
      colorguard(),
      // doiuse(doiuseOptions),
      precss(),
    ];

    return watch(['vendor/css/**/*.scss', 'components/**/*.scss'], function () {
      gulp.src('components/main.min.scss')
          .pipe(plumber())
          .pipe( sourcemaps.init() )
          .pipe(sassGlob())
          .pipe(sass().on('error', sass.logError))
          .pipe( postcss(plugins) )
          .pipe( cssnano() )
          .pipe( sourcemaps.write('.') )
          .pipe( gulp.dest('dist/css') )
          .pipe(connect.reload());
    });
});

gulp.task('serve', function() {
  connect.server({ host: '0.0.0.0', port: 8888, livereload: true });
});



gulp.task('default', ['html', 'css', 'js', 'serve']);

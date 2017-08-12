var gulp = require('gulp');

var sass = require('gulp-scss');
var cleanCSS = require('gulp-clean-css');

var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var browserSync = require('browser-sync').create();

gulp.task('jsv', function(){
  return gulp.src('./assets/js/vendor/**/*.js')
  .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./dist/js/vendor'))
        .pipe(rename('vendor.min.js'))
            .pipe(uglify())
                .pipe(gulp.dest('./dist/js/vendor'))
                    .pipe(browserSync.stream());
});

gulp.task('js', function(){
  return gulp.src('./assets/js/main.js')
    .pipe(uglify())
        .pipe(rename('main.min.js'))
            .pipe(gulp.dest('./dist/js'))
                .pipe(browserSync.stream());
});

gulp.task('cssv', function(){
  return gulp.src('./assets/css/vendor/**/*.css')
    .pipe(concat('vendor.css'))
        .pipe(gulp.dest('./dist/css/vendor'))
            .pipe(rename('vendor.min.css'))
                .pipe(cleanCSS())
                    .pipe(gulp.dest('./dist/css/vendor'))
                        .pipe(browserSync.stream());
});

gulp.task('css', function(){
  return gulp.src('./assets/css/main.scss')
    .pipe(sass().on('error', sass.logError))
        .pipe(rename('main.css'))
            .pipe(gulp.dest('./dist/css'))
                .pipe(cleanCSS())
                        .pipe(rename('main.min.css'))
                            .pipe(gulp.dest('./dist/css'))
                                .pipe(browserSync.stream());
});

gulp.task('reload', function () {
  browserSync.reload();
});
 
gulp.task('watch', function () {

    browserSync.init({
        proxy: "cncnew.com"
    });

    gulp.watch("./assets/css/**/*.scss", ['sass']);
    gulp.watch("./assets/js/**/*.js", ['js']);
    gulp.watch("./**/*.php", ['reload']);
    gulp.watch("./**/*.html", ['reload']);

});

gulp.task('default', [ 'jsv', 'js', 'css', 'cssv' ]);

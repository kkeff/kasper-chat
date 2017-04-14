var babelify = require('babelify'),
    browserify = require('browserify'),
    gulp = require('gulp'),
    rename = require('gulp-rename'),
    eslint = require('gulp-eslint'),
    webserver = require('gulp-webserver'),
    livereload = require('gulp-livereload'),
    source = require('vinyl-source-stream');

gulp.task('dev', ['lint', 'js:bundle', 'webserver', 'watch']);
gulp.task('build', ['js:bundle']);

gulp.task('webserver', function () {
  gulp.src('./')
  .pipe(webserver({
    open: true,
    fallback: 'index.html'
  }));
});

gulp.task('lint', function () {
    return gulp.src(['**/*.js','!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('js:bundle', function () {
  var bundler = browserify({
    entry: './src/index.js',
    debug: true
  });

  return bundler
    .add('./src/index.js')
    .transform(babelify)
    .bundle()
    .pipe(source('./src/index.js'))
    .pipe(rename('index.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch('src/**/*.js', ['js:bundle']);
  gulp.watch('dist/**').on('change', livereload.changed);
});

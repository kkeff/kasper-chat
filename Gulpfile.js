var babelify = require('babelify'),
    browserify = require('browserify'),
    gulp = require('gulp'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    source = require('vinyl-source-stream'),
    eslint = require('gulp-eslint'),
    postcss = require('gulp-postcss'),
    sourcemaps   = require('gulp-sourcemaps'),
    autoprefixer = require('autoprefixer'),
    webserver = require('gulp-webserver'),
    livereload = require('gulp-livereload');

const src = 'src';
const dist = 'www';
const paths = {
  js: src + '/js/*.js',
  scss: src + '/scss/*.scss',
  html: src + '/**/*.html'
};

gulp.task('default', [ 'build' ]);
gulp.task('build', [ 'js:bundle', 'autoprefixer']);
gulp.task('dev', ['build', 'webserver', 'watch'])

gulp.task('webserver', () => {
  gulp.src('www')
  .pipe(webserver({
    open: true,
    fallback: 'index.html'
  }));
});

gulp.task('lint', () => {
    return gulp.src(['**/*.js','!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('autoprefixer', function () {
    return gulp.src('./src/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([ autoprefixer() ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dest'));
});

gulp.task('css:bundle', function () {
    gulp.src('./src/scss/index.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./www/css'));
});

gulp.task('js:bundle', function () {
  var bundler = browserify({
    entry: './src/js/index.js',
    debug: true
  });

  return bundler
    .add('./src/js/index.js')
    .transform(babelify)
    .bundle()
    .pipe(source('./src/js/index.js'))
    .pipe(rename('index.js'))
    .pipe(gulp.dest('./www/js'));
});

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch('src/js/*.js', ['js:bundle']);
  gulp.watch('src/scss/*.scss', ['css:bundle']);
  gulp.watch('www/**').on('change', livereload.changed);
});

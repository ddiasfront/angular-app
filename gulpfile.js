const gulp        = require('gulp');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const less = require('gulp-less');
const bytediff = require('gulp-bytediff');
const rename = require('gulp-rename');
const ngAnnotate = require('gulp-ng-annotate')
const watch = require('gulp-watch');
const concat = require('gulp-concat');
const plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');
const minifyCSS = require('gulp-minify-css');
const sourcemaps = require('gulp-sourcemaps');
const lessDependents = require('gulp-less-dependents');
const clean = require('gulp-clean');
const jshint = require('gulp-jshint');
const gutil = require('gulp-util')

const path = {
  HTML: [ 
  	'src/*.html', 
  	'src/views/**/*.html', 
  	'src/views/*.html', 
  	'src/favicon.png'
  ],
  JS: [
  	'./src/js/app/*.js', 
  	'./src/js/app/**/*.js'
  ],
  CSS: [
	  'src/css/*.css'
  ],
  LESS: [
  	'src/less/style.less',
  	'src/less/*.less'
  ],
  LESS_ALL: [
  	'src/less/*.less'
  ], 
  IMG: [
  	'src/img/**'
  ],
  DIST: './dist'
};

gulp.task('app', function() {
  return gulp.src(['src/js/app/**/*.module.js', 'src/js/app/**/app.config.js', 'src/js/app/**/*.js'])
    .pipe(plumber())
    .pipe(concat('app.js', {newLine: ';'}))
    .pipe(babel({ presets: ['babel-preset-es2015',"babel-preset-es2016", "babel-preset-es2017"].map(require.resolve) }))
    .pipe(ngAnnotate({add: true}))
    .pipe(plumber.stop())
      .pipe(gulp.dest('dist/js/'));
});

// Static server
gulp.task('browser-sync', function() {
  browserSync.init({
      server: './dist/',
      logLevel: 'alert',
      logPrefix: 'BS DEBUG:'
  }); 
  gulp.watch("./src/js/**/*.js", ['default']);
  gulp.watch("./src/**/*.less", ['default']);
  gulp.watch("./src/**/*.html", ['default']);
  gulp.watch("./dist/**/*.html").on('change', browserSync.reload);
});


// Static server
gulp.task('browser-sync-dist', function() {
  browserSync.init({
      server: {
          baseDir: "./dist/"
      }
  });
});

/* clean up dist dir */
gulp.task('clean', function() {
	return gulp.src('./dist/*', {force: true})
		.pipe(clean());
});
/* move css */
gulp.task('css', function () {
  gulp.src(path.CSS)
    .pipe(gulp.dest(path.DIST + '/css'));
});
/* compile less */
gulp.task('less', function () {
  gulp.src(path.LESS)
  	.pipe(lessDependents())
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest(path.DIST + '/css'));
});
/* concat and compress app scripts */
gulp.task('js', ['app'], function() {
  return gulp.src('dist/js/app.js')
  .pipe(plumber())
    .pipe(bytediff.start())
      .pipe(uglify({mangle: true}))
    .pipe(bytediff.stop())
    .pipe(rename('app.min.js'))
  .pipe(plumber.stop())
  .pipe(gulp.dest('dist/js/'));
});
/* copy over markups */
gulp.task('html', function(){
  gulp.src(path.HTML, {base: 'src'})
    .pipe(gulp.dest(path.DIST));
});
/* compress images */
gulp.task('img', function(){
  gulp.src(path.IMG)
    .pipe(imagemin())
    .pipe(gulp.dest(path.DIST + '/img'));
});
/* watch all changes */
gulp.task('watch', function () {
  gulp.watch(path.LESS_ALL, ['less']);
  gulp.watch(path.VENDOR, ['vendor']);
  gulp.watch(path.JS, ['js']);
  gulp.watch(path.HTML, ['html']);
  gulp.watch(path.IMG, ['img']);
});
/* defualt */
const all_tasks = ['css', 'less', 'js', 'html'];
gulp.task('default', all_tasks);

const gulp = require('gulp');
const serve = require('gulp-serve'); 
const src = {
  js: [
    './bower_components/angular/angular.js',
    './bower_components/jquery/dist/jquery.js',
    './bower_components/bootstrap/dist/js/bootstrap.js'
  ],
  css: [
    './bower_components/bootstrap/dist/css/bootstrap.css'
  ]
};

gulp.task('serve', ['css', 'js'], serve({
  root: ['src']
}));

gulp.task('js', () => {
  return gulp.src(src.js)
    .pipe(gulp.dest('src/script/vendor'));
});

gulp.task('css', () => {
  return gulp.src(src.css)
    .pipe(gulp.dest('src/style/vendor'));
});

gulp.task('default', ['serve']);

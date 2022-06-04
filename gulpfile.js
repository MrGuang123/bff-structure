const gulp = require('gulp');
const babel = require('gulp-babel')
const watch = require('gulp-watch')

function devTask() {
  // return gulp
  // .src('./src/server/**/*.js')
  return watch('./src/server/**/*.js')
    .pipe(babel({
      babelrc: false,
      plugins: ['@babel/plugin-transform-modules-commonjs']
    }))
    .pipe(gulp.dest('./dist/server'))
}

let buildTask = null

if (process.env.NODE_ENV === 'development') {
  buildTask = gulp.series(devTask)
}

gulp.task('default', buildTask)
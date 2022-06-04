const gulp = require('gulp');
const babel = require('gulp-babel')
const watch = require('gulp-watch')
const rollup = require('gulp-rollup')
const replace = require('@rollup/plugin-replace')

const entry = './src/server/**/*.js'
const cleanEntry = './src/server/configs/index.js'

function devTask() {
  // return gulp
  // .src('./src/server/**/*.js')
  return watch(entry)
    .pipe(babel({
      babelrc: false,
      plugins: ['@babel/plugin-transform-modules-commonjs']
    }))
    .pipe(gulp.dest('./dist/server'))
}

function prodTask() {
  return gulp.src(entry)
    .pipe(babel({
      babelrc: false,
      plugins: ['@babel/plugin-transform-modules-commonjs']
    }))
    .pipe(gulp.dest('./dist/server'))
}

function cleanConfig() {
  return gulp.src(entry)
    .pipe(rollup({
      input: cleanEntry,
      output: {
        format: 'cjs'
      },
      plugins: [
        replace({
          'process.env.NODE_ENV': '"production"'
        })
      ]
    }))
    .pipe(gulp.dest('./dist/server'))
}

let buildTask = null

if (process.env.NODE_ENV === 'development') {
  buildTask = gulp.series(devTask)
} else if (process.env.NODE_ENV === 'production') {
  buildTask = gulp.series(prodTask, cleanConfig)
}

gulp.task('default', buildTask)
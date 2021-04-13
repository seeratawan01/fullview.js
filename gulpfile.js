const rename = require('gulp-rename')
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')
const minifyCss = require('gulp-clean-css')
const headerComment = require('gulp-header-comment')
const { src, series, parallel, dest, watch } = require('gulp')

const browsersync = require('browser-sync').create()

const pjson = require('./package.json')

const jsPath = 'src/fullview.js'
const cssPath = 'src/fullview.css'

// BrowserSync
function browserSync (done) {
  browsersync.init({
    server: {
      baseDir: './'
    },
    port: 3000
  }, function () {
    // something you want to do
  })
  done()
}

// BrowserSync reload
function browserSyncReload (done) {
  browsersync.reload()
  done()
}

function jsTask () {
  return src(jsPath)
    .pipe(sourcemaps.init())
    .pipe(headerComment('fullView v' + pjson.version))
    .pipe(dest('./dist'))
    .pipe(uglify({
      output: {
        comments: 'some'
      }
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(headerComment('fullView v' + pjson.version))
    .pipe(dest('./dist'))
    .pipe(browsersync.stream())
}

function cssTask () {
  return src(cssPath)
    .pipe(sourcemaps.init())
    .pipe(headerComment('fullView v' + pjson.version))
    .pipe(dest('./dist'))
    .pipe(minifyCss({
      compatibility: 'ie8',
      advanced: false,
      keepSpecialComments: '1'
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(headerComment('fullView v' + pjson.version))
    .pipe(dest('./dist'))
    .pipe(browsersync.stream())
};

function watchTask () {
  watch([cssPath, jsPath], { interval: 1000 }, parallel(cssTask, jsTask, browserSync))
  watch('./**/*.html', browserSyncReload)
}

exports.watch = series(
  parallel(jsTask, cssTask, browserSync),
  watchTask
)

exports.default = parallel(jsTask, cssTask)

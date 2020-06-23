var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-clean-css');
var { src, series, parallel, dest, watch } = require('gulp');

var jsPath = 'src/fullview.js';
var cssPath = 'src/fullview.css';


function jsTask() {
    return src(jsPath)
        .pipe(sourcemaps.init())
        .pipe(dest('./dist'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./dist'));
}


function cssTask() {

    return src(cssPath)
        .pipe(sourcemaps.init())
        .pipe(dest('./dist'))
        .pipe(minifyCss({
            compatibility: 'ie8',
            advanced: false,
            keepSpecialComments: '1'
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./dist'));
};

function watchTask() {
    watch([cssPath, jsPath], { interval: 1000 }, parallel(cssTask, jsTask));
}

exports.watch = series(
    parallel(jsTask, cssTask),
    watchTask
);

exports.default = parallel(jsTask, cssTask);



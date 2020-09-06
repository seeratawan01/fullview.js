var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-clean-css');
var headerComment = require('gulp-header-comment');
var { src, series, parallel, dest, watch } = require('gulp');

var browsersync = require("browser-sync").create();

var pjson = require('./package.json');

var jsPath = 'src/fullview.js';
var cssPath = 'src/fullview.css';


// BrowserSync
function browserSync(done) {
    browsersync.init({
        server: {
            baseDir: "./"
        },
        port: 3000
    }, function () {
        // something you want to do
    });
    done();
}

// BrowserSync reload
function browserSyncReload(done) {
    browsersync.reload();
    done();
}


function jsTask() {
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
        .pipe(browsersync.stream());
}


function cssTask() {

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
        .pipe(browsersync.stream());
};

function watchTask() {
    watch([cssPath, jsPath], { interval: 1000 }, parallel(cssTask, jsTask, browserSync));
    watch("./**/*.html", browserSyncReload);
}

exports.watch = series(
    parallel(jsTask, cssTask, browserSync),
    watchTask
);

exports.default = parallel(jsTask, cssTask);



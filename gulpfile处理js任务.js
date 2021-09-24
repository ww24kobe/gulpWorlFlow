//  配置一些自动化的任务在这里即可
const {
    src,
    pipe,
    dest,
    series,
    parallel,
    watch
} = require('gulp')

const babel = require('gulp-babel');
const uglify = require('gulp-uglify'); // 压缩js
const concat = require('gulp-concat'); // 合并js或css

function transformJsHandle() {
    return src('./src/main.js')
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(dest('./dist/js/'));
}


function jsHandle() {
    return src('./src/js/*.js')
        .pipe(concat('all.min.js'))
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(uglify())
        .pipe(dest('./dist/js/'))
}

exports.jsTask = jsHandle

exports.transformJs = transformJsHandle;
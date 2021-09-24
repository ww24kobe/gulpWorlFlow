//  配置一些自动化的任务在这里即可
const {
    src,
    pipe,
    dest,
    series,
    parallel,
    watch
} = require('gulp')
const sass = require('gulp-sass')(require('sass'));
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer'); // 添加浏览器厂商前缀（can i use）

function copyHtmlHandle() {
    return src('./src/index.html')
        .pipe(dest('dist'))
}

// 编译转化 scss -> css
function compileScssHandle() {
    return src("src/scss/*.scss")
        .pipe(sass()) // 先编译
        .pipe(autoprefixer())
        .pipe(cssmin()) // 再压缩
        .pipe(rename({
            suffix: ".min"
        })) // 再重命名
        .pipe(dest('dist/css'))
}

// 监听scss文件的变换，执行compileScssHandle
function watchScssHandle() {
    watch("src/scss/*.scss", compileScssHandle)
}

// 删除构建目录dist
function cleanDistHandle(cb) {
    del(['./dist'])
    cb();
}

exports.compileScss = compileScssHandle;
exports.watchScss = watchScssHandle;

exports.dev = parallel(copyHtmlHandle, watchScssHandle, compileScssHandle)
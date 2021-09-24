//  配置一些自动化的任务在这里即可
const {
    src,
    pipe,
    dest,
    series,
    parallel,
    watch
} = require('gulp')

var browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer'); // 添加浏览器厂商前缀（can i use）

function cssHandle() {
    return src('./src/scss/*.scss') // 源目录
        .pipe(sass()) // 下一步编译 先编译
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
        }))
        .pipe(cssmin()) // 在压缩
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(dest('./dist/css/')) // 最后输送到目标目录
        .pipe(browserSync.stream()) // 实时把结果同步给浏览器，实现热更新
}

function copyHtmlHandle() {
    return src('./src/index.html')
        .pipe(dest('dist'))
}

function watchTask() {
    // 启动一个服务器，
    browserSync.init({
        // 指定一个网站根目录
        server: "./dist"
    })
    // 并监听文件的改变自动执行相应的任务
    watch('./src/scss/*.scss', cssHandle); // 热加载(更新)
    watch('./src/index.html', copyHtmlHandle).on('change', browserSync.reload) // 页面刷新
}


// 开发环境(启动服务器)
exports.serve = watchTask
// 部署（生产）环境
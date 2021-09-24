//  配置一些自动化的任务在这里即可
const {
    src,
    pipe,
    dest,
    series,
    parallel,
    watch
} = require('gulp')

// 把src下面的index.html赋值到dist目录中去
function copyHtmlHandle() {
    return src("src/index.html")
        .pipe(dest('dist/'))
}

function copyJsHandle() {
    return src('lib/*.js')
        .pipe(dest('dist/js'))
}

function A(cb) {
    console.log('A任务');
    cb();
}

function B(cb) {
    console.log('B任务');
    cb();
}

function C(cb) {
    console.log('C任务');
    cb();
}

function watchHtmlHandle() {
    watch("./src/index.html", copyHtmlHandle)
}




// 导入任务
// exports.任务名 = 函数名
exports.copyHtml = copyHtmlHandle;
exports.copyJs = copyJsHandle;

// 串行 series(任务函数名，...)
exports.dev = series(A, B, C)

// 串行 series(任务函数名，...)
exports.build = parallel(A, B, C)

// 执行A任务，在并行执行B和C任务
exports.test = series(A, parallel(B, C))
// 监听任务
exports.watchHtml = watchHtmlHandle;
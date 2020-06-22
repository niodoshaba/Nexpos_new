//引入需要的套件
var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var sass = require('gulp-sass');

var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var fileinclude = require('gulp-file-include');





gulp.task('hello', function () {
    //do
    console.log('hello world 你好');
});


// 移動＝拷貝 src下的html 經由pipe 到dest
gulp.task('move', function () {
    //do
    return gulp.src('./dev/html_layout/*.html') //來源
        .pipe(gulp.dest('./dest')) //目的地
});


// 壓縮 css
gulp.task('minicss', function () {
    //do
    return gulp.src('./dev/css/*.css') //來源
        .pipe(cleanCSS({ compatibility: 'ie8' })) //相容於ie8
        .pipe(gulp.dest('./dest/css')) //目的地
});


// 先轉譯sass 再合併 最後壓縮
gulp.task('concat', ['sass'], function () {
    //do
    return gulp.src('./dev/css/*.css') //來源
        // .pipe(concat('all.css'))//合併
        // .pipe(cleanCSS({ compatibility: 'ie8' }))//壓縮
        .pipe(gulp.dest('./dest/css')) //目的地
});


// sass 轉譯
gulp.task('sass', function () {
    return gulp.src(['dev/sass/*.scss' , 'dev/sass/**/*.scss'])//來源
        .pipe(sass().on('error', sass.logError)) //sass轉譯
        .pipe(gulp.dest('./dev/css')); //目的地
});


// 監看 瀏覽器同步執行 此為內建功能，不用另外安裝套件(關閉監看：control+c)
gulp.task('watch', function () {
    gulp.watch('./dev/css/*.css', ['concat']);
    gulp.watch('./dev/sass/*.scss', ['sass']);
    gulp.watch('./dev/html_layout/*.html', ['move']);
});


gulp.task('copyimg' , function(){
   gulp.src('dev/img/*').pipe(gulp.dest('dest/assets/'));
})


// html 樣板
gulp.task('fileinclude', function () {
    gulp.src(['dev/html_layout/*.html' , 'dev/html_layout/**/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./dest'));
});



//同步 等同於Apache 
gulp.task('default',['copyimg'], function () {
    browserSync.init({
        server: {
            baseDir: "./dest",
            index: "reservation.html"
        }
    });
    gulp.watch('./dev/css/*.css', ['concat']).on('change', reload); //當css有變動時 同步更新
    gulp.watch(['./dev/sass/*.scss' , './dev/sass/**/*.scss'], ['sass']).on('change', reload); //當sass有變動時 同步更新
    // gulp.watch('./dev/html_layout/*.html', ['move']).on('change', reload);
    gulp.watch(['dev/html_layout/*.html', 'dev/html_layout/**/*.html'], ['fileinclude']).on('change', reload); //當html_layout與app裡面的html有變動時 同步更新
});
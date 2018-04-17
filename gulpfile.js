var
    gulp            = require('gulp'),
    browserify      = require('browserify'),
    babelify        = require('babelify'),
    browserSync     = require('browser-sync').create(),
    source          = require('vinyl-source-stream'),
    sass            = require('gulp-sass'),
    concat          = require('gulp-concat'),
    minifyCSS       = require('gulp-clean-css');

gulp.task('sass', function(){
return gulp.src('app/sass/**/*.sass')
    .pipe(sass())
    .pipe(concat('index.css'))
    .pipe(minifyCSS({ level: 2 }))
    .pipe(gulp.dest('./app/css'))
});

gulp.task('browser-sync', ['build', 'sass'], function() {
    browserSync.init({
        server: {
            baseDir: "./app"
        },
        browser: "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
        notify: true,
        online: true,
        host: "172.16.20.49",
        port: 3000
    });
});

gulp.task('build', function () {
    return browserify({entries: './app/js/index.jsx', extensions: ['.jsx'], debug: true})
        .transform('babelify', {presets: ['es2015', 'react', 'env', 'stage-0']})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./app/js'));
});

gulp.task("copyindex", function(){
    gulp.src("./app/index.html")
    .pipe(gulp.dest("./dist"));
});

gulp.task("copyJS", function(){
    gulp.src("./app/js/*.js")
    .pipe(gulp.dest("./dist"));
});

gulp.task("copyCssFiles", ['sass'], function(){
    gulp.src("./app/css/*.css")
    .pipe(concat('index.css'))
    .pipe(minifyCSS({ level: 2 }))
    .pipe(gulp.dest("./dist"));
});

gulp.task('watch', ['browser-sync'], function () {

    gulp.watch('./app/sass/**/*.sass', ['sass']);
    gulp.watch('./app/js/**/**/*.jsx', ['build']);
    //gulp.watch('./app/js/**/*.js', ['copyJS']);
    //gulp.watch('./app/index.html', ['copyindex']);
    gulp.watch(['./app/**/*.*', '!./app/**/*.jsx'], browserSync.reload);
});

gulp.task('default', ['watch']);

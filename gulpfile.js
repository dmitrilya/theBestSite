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
    .pipe(minifyCSS())
    .pipe(gulp.dest('app/css'))
});

gulp.task('browser-sync', ['buildLogIn', 'buildTicTacToe', 'buildPare', 'buildBlackJack', 'copyindex', 'copyCssFiles', 'copyJS'], function() {
    browserSync.init({
        server: {
            baseDir: "./app"
        },
        notify: true,
        online: true,
        host: "192.168.0.12",
        port: 3000
    });
});

gulp.task('buildLogIn', function () {
    return browserify({entries: './app/js/logIn.jsx', extensions: ['.jsx'], debug: true})
        .transform('babelify', {presets: ['es2015', 'react', 'env', 'stage-0']})
        .bundle()
        .pipe(source('logIn.js'))
        .pipe(gulp.dest('./app/js/build'));
});

gulp.task('buildTicTacToe', function () {
    return browserify({entries: './app/js/TicTacToe.jsx', extensions: ['.jsx'], debug: true})
        .transform('babelify', {presets: ['es2015', 'react', 'env', 'stage-0']})
        .bundle()
        .pipe(source('TicTacToe.js'))
        .pipe(gulp.dest('./app/js/build'));
});

gulp.task('buildPare', function () {
    return browserify({entries: './app/js/Pare.jsx', extensions: ['.jsx'], debug: true})
        .transform('babelify', {presets: ['es2015', 'react', 'env', 'stage-0']})
        .bundle()
        .pipe(source('Pare.js'))
        .pipe(gulp.dest('./app/js/build'));
});

gulp.task('buildBlackJack', function () {
    return browserify({entries: './app/js/blackJack.jsx', extensions: ['.jsx'], debug: true})
        .transform('babelify', {presets: ['es2015', 'react', 'env', 'stage-0']})
        .bundle()
        .pipe(source('blackJack.js'))
        .pipe(gulp.dest('./app/js/build'));
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

    gulp.watch('./app/sass/**/*.sass', ['sass'])
    gulp.watch('./app/js/**/*.jsx', ['buildLogIn', 'buildTicTacToe', 'buildPare', 'buildBlackJack']);
    //gulp.watch('./app/js/**/*.js', ['copyJS']);
    //gulp.watch('./app/index.html', ['copyindex']);
    gulp.watch('./app/**/*.*', browserSync.reload);
});

gulp.task('default', ['watch']);

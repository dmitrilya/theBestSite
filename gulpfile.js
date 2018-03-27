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

gulp.task('browser-sync', ['buildLogIn', 'buildTicTacToe', 'buildPare', 'buildBlackJack', 'buildGame', 'sass'], function() {
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
    return browserify({entries: './app/js/LogIn/logIn.jsx', extensions: ['.jsx'], debug: true})
        .transform('babelify', {presets: ['es2015', 'react', 'env', 'stage-0']})
        .bundle()
        .pipe(source('logIn.js'))
        .pipe(gulp.dest('./app/js/build'));
});

gulp.task('buildTicTacToe', function () {
    return browserify({entries: './app/js/TicTacToe/TicTacToe.jsx', extensions: ['.jsx'], debug: true})
        .transform('babelify', {presets: ['es2015', 'react', 'env', 'stage-0']})
        .bundle()
        .pipe(source('ticTacToe.js'))
        .pipe(gulp.dest('./app/js/build'));
});

gulp.task('buildPare', function () {
    return browserify({entries: './app/js/Pare/Pare.jsx', extensions: ['.jsx'], debug: true})
        .transform('babelify', {presets: ['es2015', 'react', 'env', 'stage-0']})
        .bundle()
        .pipe(source('pare.js'))
        .pipe(gulp.dest('./app/js/build'));
});

gulp.task('buildBlackJack', function () {
    return browserify({entries: './app/js/BlackJack/blackJack.jsx', extensions: ['.jsx'], debug: true})
        .transform('babelify', {presets: ['es2015', 'react', 'env', 'stage-0']})
        .bundle()
        .pipe(source('blackJack.js'))
        .pipe(gulp.dest('./app/js/build'));
});

gulp.task('buildGame', function () {
    return browserify({entries: './app/js/Game/Game.jsx', extensions: ['.jsx'], debug: true})
        .transform('babelify', {presets: ['es2015', 'react', 'env', 'stage-0']})
        .bundle()
        .pipe(source('game.js'))
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

    gulp.watch('./app/sass/**/*.sass', ['sass']);
    gulp.watch('./app/js/LogIn/*.*', ['buildLogIn']);
    gulp.watch('./app/js/TicTacToe/*.*', ['buildTicTacToe']);
    gulp.watch('./app/js/Pare/*.*', ['buildPare']);
    gulp.watch('./app/js/BlackJack/*.*', ['buildBlackJack']);
    gulp.watch('./app/js/Game/*.*', ['buildGame']);
    //gulp.watch('./app/js/**/*.js', ['copyJS']);
    //gulp.watch('./app/index.html', ['copyindex']);
    gulp.watch('./app/**/*.*', browserSync.reload);
});

gulp.task('default', ['watch']);

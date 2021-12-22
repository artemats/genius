var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    rev_append = require('gulp-rev-append'),
    htmlmin = require('gulp-html-minifier2'),
    connect = require('gulp-connect');

gulp.task('connect', function() {
    connect.server({
        root: ['dist'],
        port: 8000,
        base: 'http://localhost',
        livereload: true
    });
});

gulp.task('sass', function() {
    return gulp.src(['./src/style.scss', './src/media.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('styles.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./src'))
        .pipe(connect.reload());
});

gulp.task('styles', function() {
    return gulp.src(['./src/*.css', './src/styles.css'])
        .pipe(concat('styles.min.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./dist/'))
        .pipe(connect.reload());
});

gulp.task('scripts', function() {
    return gulp.src(['./src/*jquery-3.3.1.min*', './src/*.js', './src/script.js'])
        .pipe(concat('script.min.js'))
        .pipe(uglify().on('error', function(e){
            console.log(e);
        }))
        .pipe(gulp.dest('./dist/'))
        .pipe(connect.reload());
});

gulp.task('rev_append', function() {
    gulp.src('index.html')
        .pipe(rev_append())
        .pipe(gulp.dest('.'));
});

gulp.task('html', function() {
    gulp.src('./src/*.html')
        .pipe(htmlmin({
            collapseWhitespace: false
        }))
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload());
});

gulp.task('watch', function(){
    gulp.watch(['./src/style.scss', './src/media.scss'], ['sass']);
    gulp.watch(['./src/*jquery*', './src/*.js'], ['scripts']);
    gulp.watch(['./src/*.css', './src/styles.css'], ['styles']);
    gulp.watch(['./src/*.html', './dist'], ['html']);
});

gulp.task('default', function() {
    gulp.start('sass', 'scripts', 'styles', 'rev_append', 'html', 'connect');
    gulp.watch(['./src/style.scss', './src/media.scss'], ['sass']);
    gulp.watch(['./src/*jquery*', './src/*.js'], ['scripts']);
    gulp.watch(['./src/*.css', './src/styles.css'], ['styles']);
    gulp.watch(['./src/*.html', './dist'], ['html']);
    gulp.watch('rev_append');
});
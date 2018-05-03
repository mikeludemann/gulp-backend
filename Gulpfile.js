// Load Plugins / Packages from gulp

var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var phpmin = require('@aquafadas/gulp-php-minify');
var htmlmin = require('gulp-htmlmin');
var autoprefixer = require('gulp-autoprefixer');
var browsersync = require('browser-sync').create();

// Images Task
gulp.task('images', function () {
    return gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('src/images/min/'))
});

// HTML Task
gulp.task('html-minify', function () {
    return gulp.src('*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('/min/html'));
});

// PHP Task
gulp.task('php-minify', function(){
    gulp.src('*.php', {
        read: false
    })
    .pipe(phpmin())
    .pipe(gulp.dest('/min/php'))
});

// Watch Task
gulp.task('watch', function(){
    gulp.watch('*.html', gulp.series('html-minify', browsersync.reload));
    gulp.watch('*.php', gulp.series('php-minify', browsersync.reload));
});

// Static Server and watching files Task
gulp.task('bs', function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("*.php").on('change', browserSync.reload);
    gulp.watch("*.html").on('change', browserSync.reload);
});

// Execute Tasks
gulp.task("default", gulp.parallel('images', 'watch'));
gulp.task("minify", gulp.parallel('html-minify', 'php-minify'))
gulp.task("server", gulp.parallel('bs'));
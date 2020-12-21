const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

// Bootstrap
gulp.task('bootstrapJs', () => {
    return gulp.src("node_modules/bootstrap/dist/js/bootstrap.bundle.min.js")
        .pipe(gulp.dest("dist/js"));
});
gulp.task('bootstrapCss', () => {
    return gulp.src("node_modules/bootstrap/dist/css/bootstrap.min.css")
        .pipe(gulp.dest("dist/css"));
});

// Copy production JS and Css files
gulp.task('productionJs', gulp.series('bootstrapJs'));
gulp.task('productionCss', gulp.series('bootstrapCss'));
gulp.task('production', gulp.series('productionJs', 'productionCss'));

//Compile and copy my Sass files
gulp.task('sass', function() {
    return gulp.src("src/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

//Copy my html files
gulp.task('html', function() {
    return gulp.src("src/*.html")
        .pipe(gulp.dest("dist"))
        .pipe(browserSync.stream());
});

//Copy my JS files
gulp.task('js', function() {
    return gulp.src("src/js/*.js")
        .pipe(gulp.dest("dist/js"))
        .pipe(browserSync.stream());
});

//Default task
gulp.task('serve', gulp.series('production', 'sass', 'html', 'js', function() {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch("src/scss/*.scss", gulp.series('sass'));
    gulp.watch("src/*.html").on('change', gulp.series('html'));
    gulp.watch("src/js/*.js").on('change', gulp.series('js'));
}));
gulp.task('default', gulp.series('serve'));
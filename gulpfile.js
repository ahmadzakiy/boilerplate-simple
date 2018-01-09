var gulp = require("gulp"),
    sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    browserSync = require("browser-sync"),
    webpack = require("webpack-stream");
    pug = require('gulp-pug');



gulp.task("pug", function buildHTML() {
  return gulp.src("./public/build/*.pug")
  .pipe(pug()) // pipe to pug plugin
  .pipe(gulp.dest("./public/")); // tell gulp our output folder

});

gulp.task("sass", function() {
  return gulp.src("./resource/assets/sass/**/*.scss")
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest("./public/assets/css/"));
});

gulp.task("script", function() {
    return gulp.src("./resource/assets/js/app.js")
    .pipe(webpack(require("./webpack.config.js")))
    .pipe(gulp.dest("./public/assets/js/"));
});


gulp.task("serve", function() {
    browserSync.init({
      server: {
        baseDir: "./public/"
      }
    })
    gulp.watch("./resource/assets/sass/**/*.scss",['sass']);
    gulp.watch("./resource/assets/js/**/*.js",['script']);
    gulp.watch("./public/build/*.pug",['pug']);

    gulp.watch("./public/assets/css/**/*.css").on("change", browserSync.reload)
    gulp.watch("./public/assets/js/app.js").on("change", browserSync.reload)
    gulp.watch("./public/*.html").on("change", browserSync.reload)
});

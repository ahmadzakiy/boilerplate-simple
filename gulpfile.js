const gulp = require("gulp"),
  sass = require("gulp-sass"),
  autoprefixer = require("gulp-autoprefixer"),
  browserSync = require("browser-sync"),
  webpack = require("webpack-stream"),
  uglify = require("gulp-uglify"),
  cleanCSS = require("gulp-clean-css"),
  plumber = require("gulp-plumber"),
  include = require("gulp-include"),
  sourcemaps = require("gulp-sourcemaps"),
  notify = require("gulp-notify");

gulp.task("html", () => {
  return gulp
    .src("./resource/pages/*.html")
    .pipe(
      plumber({
        errorHandler: function (err) {
          notify.onError({
            title: "Gulp error in " + err.plugin,
            message: err.toString()
          })(err);
        }
      })
    )
    .pipe(include())
    .pipe(plumber.stop())
    .pipe(gulp.dest("./public"))
    .pipe(notify("HTML updated!"));
});

gulp.task("css", () => {
  return gulp
    .src("./resource/assets/sass/**/*.scss")
    .pipe(
      plumber({
        errorHandler: function (err) {
          notify.onError({
            title: "Gulp error in " + err.plugin,
            message: err.toString()
          })(err);
        }
      })
    )
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cleanCSS({
      compatibility: "ie8"
    }))
    .pipe(sourcemaps.write())
    .pipe(plumber.stop())
    .pipe(gulp.dest("./public/assets/css/"))
    .pipe(notify("CSS updated!"));
});

gulp.task("js", () => {
  return (
    gulp
    .src("./resource/assets/js/app.js")
    .pipe(
      plumber({
        errorHandler: function (err) {
          notify.onError({
            title: "Gulp error in " + err.plugin,
            message: err.toString()
          })(err);
        }
      })
    )
    .pipe(sourcemaps.init())
    .pipe(webpack(require("./webpack.config.js")))
    .pipe(uglify({
      mangle: false
    }))
    .pipe(sourcemaps.write())
    .pipe(plumber.stop())
    .pipe(gulp.dest("./public/assets/js/"))
    .pipe(notify("JS updated!"))
  );
});

gulp.task("serve", () => {
  browserSync.init({
    server: {
      baseDir: "./public/"
    },
    port: 3000,
    notify: false,
    ghostMode: false,
    online: false,
    open: true
  });
  gulp.watch("./resource/pages/**/*.html", ["html"]);
  gulp.watch("./resource/assets/sass/**/*.scss", ["css"]);
  gulp.watch("./resource/assets/js/**/*.js", ["js"]);

  gulp.watch("./public/*.html").on("change", browserSync.reload);
  gulp.watch("./public/assets/css/*.css").on("change", browserSync.reload);
  gulp.watch("./public/assets/js/*.js").on("change", browserSync.reload);
});
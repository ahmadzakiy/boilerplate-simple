const gulp = require("gulp");
const { parallel, series } = require("gulp");

const sass = require("gulp-sass");
const browserSync = require("browser-sync");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const include = require("gulp-include");
const autoprefixer = require("gulp-autoprefixer");
const uglify = require("gulp-uglify");
const cleanCSS = require("gulp-clean-css");
const babel = require("gulp-babel");

function html(cb) {
  gulp
    .src("./resource/pages/*.html")
    .pipe(include())
    .pipe(
      plumber({
        errorHandler: function (err) {
          notify.onError({
            title: "Gulp error in " + err.plugin,
            message: err.toString(),
          })(err);
        },
      })
    )
    .pipe(plumber.stop())
    .pipe(gulp.dest("./public"))
    .pipe(notify("HTML updated!"));
  cb();
}

function css(cb) {
  gulp
    .src("./resource/assets/sass/**/*.scss")
    .pipe(
      plumber({
        errorHandler: function (err) {
          notify.onError({
            title: "Gulp error in " + err.plugin,
            message: err.toString(),
          })(err);
        },
      })
    )
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(plumber.stop())
    .pipe(gulp.dest("./public/assets/css/"))
    .pipe(notify("CSS updated!"));
  cb();
}

function js(cb) {
  gulp
    .src("./resource/assets/js/*.js")
    .pipe(
      plumber({
        errorHandler: function (err) {
          notify.onError({
            title: "Gulp error in " + err.plugin,
            message: err.toString(),
          })(err);
        },
      })
    )
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(uglify({ mangle: false }))
    .pipe(plumber.stop())
    .pipe(gulp.dest("./public/assets/js/"))
    .pipe(notify("JS updated!"));
  cb();
}

function serve() {
  browserSync.init({
    server: {
      baseDir: "./public/",
    },
    port: 3000,
    notify: false,
    ghostMode: false,
    online: false,
    open: true,
  });
  gulp
    .watch("./resource/assets/sass/**/*.scss", css)
    .on("change", browserSync.reload);
  gulp
    .watch("./resource/assets/js/**/*.js", js)
    .on("change", browserSync.reload);
  gulp
    .watch(["./resource/pages/*.html", "./resouce/pages/includes/*.html"], html)
    .on("change", browserSync.reload);
}

// Default 'gulp' command with start local server and watch files for changes.
exports.default = series(html, css, js, serve);

// 'gulp build' will build all assets but not run on a local server.
exports.build = parallel(html, css, js);

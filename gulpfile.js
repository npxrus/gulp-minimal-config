import autoprefixer from "autoprefixer";
import browserSync from "browser-sync";
import del from "del";
import groupMedia from "gulp-group-css-media-queries";
import gulp from "gulp";
import minmax from "postcss-media-minmax";
import postcss from "gulp-postcss";
import postimport from "postcss-import";
import replace from "gulp-replace";
import shorthand from "gulp-shorthand";

// System
const server = browserSync.create();

const paths = {
  layout: {
    src: "src/*.html",
    dest: "dist/",
  },
  styles: {
    src: "src/assets/styles/style.css",
    dest: "dist/assets/styles/",
    watch: "src/assets/styles/**/*.css",
  },
  scripts: {
    src: "src/assets/scripts/**/*.js",
    dest: "dist/assets/scripts/",
  },
};

// Service
const clean = () => del(["dist"]);

const reload = (done) => {
  server.reload();
  done();
};

const serve = (done) => {
  server.init({
    server: {
      baseDir: "./dist",
    },
  });
  done();
};

// HTML
const html = () => {
  return gulp
    .src(paths.layout.src)
    .pipe(gulp.dest(paths.layout.dest))
    .pipe(server.stream());
};

// Styles
const css = () => {
  return gulp
    .src(paths.styles.src)
    .pipe(postcss([postimport, minmax, autoprefixer]))
    .pipe(replace(/\.\.\//g, ""))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(shorthand())
    .pipe(groupMedia())
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(server.stream());
};

const watch = () => {
  gulp.watch(paths.layout.src, gulp.series(html));
  gulp.watch(paths.styles.watch, gulp.series(css));
};

export default gulp.series(clean, gulp.parallel(html, css), serve, watch);

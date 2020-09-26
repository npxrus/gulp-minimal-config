import gulp from "gulp";

import browserSync from "browser-sync";
import del from "del";

const server = browserSync.create();

const paths = {
  layout: {
    src: "src/*.html",
    dest: "dist/",
  },
  styles: {
    src: "src/assets/styles/*.css",
    dest: "dist/assets/styles/",
  },
  scripts: {
    src: "src/assets/scripts/*.js",
    dest: "dist/assets/scripts/",
  },
};

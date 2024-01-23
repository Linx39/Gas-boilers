import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sourcemap from 'gulp-sourcemaps';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import htmlmin from 'gulp-htmlmin';
import imagemin from 'gulp-imagemin';
import webp from 'gulp-webp';
import svgstore from 'gulp-svgstore';
import {deleteAsync} from 'del';
import browser from 'browser-sync';

// Styles
export const styles = () => {
  return gulp.src('source/less/style.less', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('docs/css'))
    .pipe(browser.stream());
}

// HTML
export const html = () => {
  return gulp.src('source/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('docs'));
}

// Scripts
export const scripts = () => {
  return gulp.src('source/js/*.js')
    .pipe(gulp.dest('docs/js'))
    .pipe(browser.stream());
}

// Images
export const optimizeImages = () => {
  return gulp.src([
    'source/img/**/*.{png,jpg,svg}',
    '!source/img/sprite/*'
  ])
    .pipe(imagemin())
    .pipe(gulp.dest('docs/img'))
}

// Copy Images
export const copyImages = () => {
  return gulp.src([
    'source/img/**/*.{png,jpg,svg}',
    '!source/img/sprite/*'
  ])
    .pipe(gulp.dest('docs/img'))
}

// WebP
export const createWebp = () => {
  return gulp.src([
    'source/img/**/*.{jpg,png}',
    '!source/img/favicons/*'
  ])
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest('docs/img'))
}

// Sprite
export const sprite = () => {
  return gulp.src('source/img/sprite/*.svg')
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('docs/img'));
}

// Copy
export const copy = (done) => {
  gulp.src([
    'source/fonts/*.ttf',
    'source/*.ico',
    'source/*.webmanifest',
    'source/leaflet/leaflet.*'
  ], {
    base: "source"
  })
    .pipe(gulp.dest('docs'))
  done();
}

// Clean
export const clean = () => {
  return deleteAsync('docs');
};

// Server
export const server = (done) => {
  browser.init({
    server: {
      baseDir: 'docs'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Reload
const reload = (done) => {
  browser.reload();
  done();
}

// Watcher
const watcher = () => {
  gulp.watch('source/less/**/*.less', gulp.series(styles));
  gulp.watch('source/js/*.js', gulp.series(scripts));
  gulp.watch('source/*.html', gulp.series(html, reload));
}

// Build
export const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    sprite,
    createWebp
  ),
);

// Default
export default gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    sprite,
    createWebp
  ),
  gulp.series(
    server,
    watcher
  ));

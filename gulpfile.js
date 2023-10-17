import gulp from 'gulp';
import plumber from 'gulp-plumber';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';

// Styles

export const styles = () => {
  return gulp.src('source/less/style.less', { sourcemaps: true })
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('source/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// HTML

export const html = () => {
  return gulp.src('source/*.html')
    // .pipe(htmlmin({ collapseWhitespace: true }))
    // .pipe(gulp.dest('build'))
    .pipe(browser.stream()); //?????
}

// Scripts

export const scripts = () => {
  return gulp.src('source/js/app.js')
    // .pipe(terser())
    // .pipe(rename('app.min.js'))
    // .pipe(gulp.dest('build/js'))
    .pipe(browser.stream());
}

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'source'
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
  gulp.watch('source/js/app.js', gulp.series(scripts));
  gulp.watch('source/*.html', gulp.series(html, reload));
}


export default gulp.series(
  styles, scripts, html, server, watcher
);

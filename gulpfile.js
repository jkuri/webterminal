'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const server = require('gulp-develop-server');
const bs = require('browser-sync');
const copy = require('gulp-copy');
const rollup = require('gulp-rollup');
const buble = require('rollup-plugin-buble');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const pump = require('pump');

const options = {
  server: {
    path: './server.js'
  },
  bs: {
    proxy: {
      target: 'http://localhost:9950',
      ws: true
    }
  }
};

const copyHtmlFiles = [
  './src/**/*.html'
];

gulp.task('server:start', () => {
  server.listen(options.server, (err) => {
    if (!err) {
      bs(options.bs);
    }
  });
});

gulp.task('server:restart', () => {
  gulp.src('./server.js')
      .pipe(server())
      .pipe(bs.reload({ stream: true }));
});

gulp.task('copy:html', () => {
  gulp.src(copyHtmlFiles)
      .pipe(copy('./dist', { prefix: 2 }));
});

gulp.task('sass', () => {
 return gulp.src('./src/sass/app.sass')
   .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
   .pipe(gulp.dest('./dist/css'));
});

gulp.task('vendor', () => {
  return gulp.src('./src/js/vendor/**/*.js')
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('app', () => {
  gulp.src('./src/js/app/**/*.js')
    .pipe(rollup({
      format: 'iife',
      entry: './src/js/app/app.js',
      plugins: [buble()]
    }))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('minify', (cb) => {
  pump([
      gulp.src('./dist/js/*.js'),
      uglify(),
      gulp.dest('./dist/js/')
    ],
    cb
  );
});

gulp.task('default', ['copy:html', 'sass', 'app', 'vendor', 'minify', 'server:start'], () => {
  gulp.watch(options.server.path, ['server:restart']);
  gulp.watch(copyHtmlFiles, ['copy:html']);
  gulp.watch('./src/sass/**/*.sass', ['sass']);
  gulp.watch('./src/js/app/**/*.js', ['app']);
});

gulp.task('build', ['copy:html', 'sass', 'app', 'vendor', 'minify']);

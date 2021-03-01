const { dest, src, parallel, watch } = require('gulp');
const concat = require('gulp-concat');
const scss = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

const styles = () => {
  return src('./src/scss/*.scss')
    .pipe(scss({ outputStyle: 'expanded' }))
    .pipe(autoprefixer({
      cascade: true,
      overrideBrowserslist: ['last 5 versions']
    }))
    .pipe(concat('main.css'))
    .pipe(dest('./docs/css/'));
}

const html = () => {
  return src('./src/*.html')
    .pipe(dest('./docs/'));
}

const watching = () => {
  watch('./src/scss/*.scss', parallel(styles));
  watch('./src/*.html', parallel(html));
}

exports.build = parallel(styles, html);
exports.default = parallel(exports.build, watching);
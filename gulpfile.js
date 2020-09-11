let projectFolder = "build";
let sourceFolder = "src";

let path = {
  build: {
    html: projectFolder + "/",
    css: projectFolder + "/css/",
    js: projectFolder + "/js/",
    img: projectFolder + "/img/",
    mp3: projectFolder + "/mp3/",
    fonts: projectFolder + "/fonts/",
  },
  src: {
    html: [sourceFolder + "/*.html", "!" + sourceFolder + "/_*.html"],
    css: sourceFolder + "/sass/style.scss",
    js: sourceFolder + "/js/main.js",
    img: sourceFolder + "/img/**/*.{jpg,png,gif}",
    mp3: sourceFolder + "/mp3/**/*.{mp3, m4a}",
    fonts: sourceFolder + "/fonts/*.ttf",
  },
  watch: {
    html: sourceFolder + "/**/*.html",
    css: sourceFolder + "/sass/**/*.scss",
    js: sourceFolder + "/js/**/*.js",
    img: sourceFolder + "/img/**/*.{jpg,png,gif}",
    mp3: sourceFolder + "/mp3/**/*.{mp3, m4a}"
  },
  clean: "./" + projectFolder + "/"
}


let {src, dest} = require('gulp'),
  gulp = require('gulp'),
  browsersync = require('browser-sync').create(),
  fileinclude = require('gulp-file-include'),
  del = require('del'),
  scss = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify-es').default, // минифицирует файлы
  imagemin = require('gulp-imagemin'),
  plumber = require('gulp-plumber'),
  rollup = require('gulp-better-rollup'),
  sourcemaps = require('gulp-sourcemaps'),
  mocha = require(`gulp-mocha`),
  commonjs = require(`rollup-plugin-commonjs`),
  babel = require('rollup-plugin-babel'),
  resolve = require('rollup-plugin-node-resolve')
  browserify = require(`browserify`),
  vinylsource = require(`vinyl-source-stream`),
  tsify = require(`tsify`);


function browserSync() {
  browsersync.init({
    server: {
      baseDir: "./" + projectFolder + "/"
    },
    port: 3000,
    notify: false,
    open: false
  })
}

function html() {
  return src(path.src.html)
    .pipe(fileinclude())
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream())
}

function css() {
  return src(path.src.css)
    .pipe(plumber())
    .pipe(scss({
      outputStyle: "expanded"
    }))
    .pipe(autoprefixer({
      overrideBrowsersList: ["last 5 versions"],
      cascade: true
    }))
    .pipe(dest(path.build.css))
    .pipe(rename({ extname: ".min.css" }))
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream())
}

function js() {
  return src(path.src.js)
    .pipe(plumber())
    .pipe(fileinclude())
    .pipe(sourcemaps.init())
    .pipe(rollup({}, 'iife'))
    // .pipe(rollup({ // с полифилами, верхнюю строку тогда закомментировать
    //   plugins: [
    //     resolve({browser: true}),
    //     commonjs(),
    //     babel({
    //       babelrc: false,
    //       exclude: `node_modules/**`,
    //       presets: [`@babel/env`]
    //     })
    //   ]
    // }, `iife`))
    .pipe(uglify())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(sourcemaps.write(''))
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream())
}

function images() {
  return src(path.src.img)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      interlaced: true,
      optimizationLevel: 3
    }))
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream())
}

function music() {
  return src(path.src.mp3)
    .pipe(dest(path.build.mp3))
    .pipe(browsersync.stream())
}

function watchFiles() {
  gulp.watch([path.watch.html], html)
  gulp.watch([path.watch.css], css)
  gulp.watch([path.watch.js], js)
  gulp.watch([path.watch.img], images)
  gulp.watch([path.watch.mp3], music)
}

function clean() {
  return del(path.clean)
}

gulp.task(`test`, function () {
  return gulp
    .src([`src/test/**/*.test.js`])
    .pipe(rollup({
      plugins: [
        commonjs()           // Сообщает Rollup, что модули можно загружать из node_modules
      ]}, `cjs`))            // Выходной формат тестов — `CommonJS` модуль
    .pipe(gulp.dest(`build/test`))
    .pipe(mocha({reporter: `spec`}))
});

gulp.task(`typescript`, function () {
  return browserify({
      basedir: `./src/js/`,
      debug: true,
      entries: [`main.ts`],
      cache: {},
      packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .pipe(vinylsource(`main.js`))
    .pipe(gulp.dest(`build/js`));
});

let build = gulp.series(clean, gulp.parallel(js, css, html, images, music))
let watch = gulp.parallel(build, watchFiles, browserSync)

exports.music = music;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;

// jshint ignore: start

// ========================================
// Gulpfile
// ========================================

/**
 * Load dependencies
 */
const workbox = require('workbox-build');
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('gulp-cssnano');
const pug = require('pug');
const gulpPug = require('gulp-pug');
const puglinter = require('gulp-pug-linter');
const runSequence = require('run-sequence');
const del = require('del');
const g = require("gulp-load-plugins")();

const rollup = require('rollup-stream');
const babel = require('rollup-plugin-babel');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');


/**
 * NPM package js can be included directly from the node_modules folder.
 * Be sure to consider order of the files and keep dependancies at the top
 * of the stack.
 *
 * 'node_modules/bootstrap/js/dist/modal.js',
 */

const paths = {
    styles:  ['src/sass/**/*.scss'],
    scripts: [
                'src/js/lib/**/*.js',
                'src/js/*.js'
             ],
    pug: ['src/pug/**/*.pug']
};

/**
 * Copy the latest Service Worker workbox file to the dist folder ready for
 * use in precacheing.
 */
gulp.task('copy', () =>
  gulp.src([
    'node_modules/workbox-sw/build/importScripts/workbox-sw.prod*.js'
  ]).pipe(gulp.dest('./dist/js/'))
);

/**
 * Run the main SASS task, this will create a temp CSS file and Source maps,
 * as well as running vendor prefixes.
 */
gulp.task('sass', () => {

    var plugins = [
        autoprefixer({
            browsers: ['last 2 versions', 'ie 10', 'ie 11'],
            grid: true,
            cascade: false
        })
    ];

    return gulp.src(paths.styles)
        .pipe(sourcemaps.init())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(postcss( plugins ))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('.tmp'));

});

/**
 * Run the Minify task which has a dependency of the SASS task
 * (SASS will be run first). Minify the temp CSS file and save to the
 * dist directory.
 */
gulp.task('minifycss', () => {

  var mediQueryConfig = {
    output: {
      path: './dist/css'
    },
    queries: {
      'only screen and (min-width: 576px)': 'small',
      'only screen and (min-width: 768px)': 'medium',
      'only screen and (min-width: 992px)': 'large',
      'only screen and (min-width: 1170px)': 'huge'
    },
    minimize: true
  }

    return gulp.src('.tmp/app.css')
        .pipe(sourcemaps.init({loadMaps:true}))
        .pipe(postcss([
          require('postcss-import')(),
          require('postcss-preset-env')(),
          require('postcss-extract-media-query')(mediQueryConfig)
        ]))
        .pipe(cssnano({
          autoprefixer: false,
          discardComments: {
            removeAll: true
          }
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/css'));
});


gulp.task('bundle-js', function() {
  return rollup({
      input: './src/js/app.js',
      sourcemap: true,
      format: 'es',
      plugins: [
        babel({
          presets: [ 'es2015-rollup' ],
          babelrc: false,
          exclude: 'node_modules/**'
        })
      ]
    })

    // point to the entry file.
    .pipe(source('app.js', './src/js/'))

    // buffer the output. most gulp plugins, including gulp-sourcemaps, don't support streams.
    .pipe(buffer())

    // tell gulp-sourcemaps to load the inline sourcemap produced by rollup-stream.
    .pipe(sourcemaps.init({loadMaps: true}))

        // transform the code further here.

    // if you want to output with a different name from the input file, use gulp-rename here.
    //.pipe(rename('index.js'))

    // write the sourcemap alongside the output file.
    .pipe(sourcemaps.write('.'))

    // and output to ./dist/main.js as normal.
    .pipe(gulp.dest('./dist/js'));
});


/**
 *
 */
gulp.task('move-js-modules', () => {
  return gulp.src("./src/js/**/**.*")
      .pipe(gulp.dest('./dist/js/modules/'));
})

/**
 * Clean up the CSS files
 */
gulp.task('clean-css', () => {
    del([
        './.tmp/*.css',
        './dist/css/*.css',
        './dist/css/*.map'
    ]);
});

/**
 * Clean up the JS files
 */
gulp.task('clean-js', () => {
    del([
        './dist/js/**/*.js',
        './dist/js/*.map'
    ]);
});

/**
 * Clean up the HTML files
 */
gulp.task('clean-html', () => {
    del([
        './dist/html/**/*.html'
    ]);
});

/**
 * Build out pug files as HTML templates.
 */
gulp.task('build-templates', () => {
  return gulp.src('./src/pug' + '/**/*.pug')
    .pipe(gulpPug({
        compileDebug: false,
        locals: {
          platform: 'development'
        },
        pretty: true,
        verbose: true
      })
      .on('error', notify.onError({
        title: 'PUG Error',
        message: [
          'Error on line: <%= error.line %> of <%= error.message %>  <%= error %>',
        ],
        onLast: true
      })))

    .pipe(gulp.dest('./dist/html'))
});


/**
 * Bundle the Service Worker precacheing, using the base service-worker file
 * as a template.
 */
gulp.task('bundle-sw', () => {
  return workbox.injectManifest({
    swSrc: './src/app/service-worker.js',
    globDirectory: './',
    globPatterns: [
      '**/*.{html,js,css,svg,png,webp,jpg,gif,woff2,php}'
    ],
    swDest: './sw.js'
  }).then(({warnings}) => {
    // In case there are any warnings from workbox-build, log them.
    for (const warning of warnings) {
      console.warn(warning);
    }
  }).catch((error) => {
    console.warn('Service worker generation failed:', error);
  });
});




/**
 * Set the task run order for style tasks
 */
gulp.task('styles', (callback) => {
    runSequence(
        'clean-css',
        'sass',
        'minifycss',
        callback
    );
});

/**
 * Set the task run order for script tasks
 */
gulp.task('scripts', (callback) => {
    runSequence(
        'clean-js',
        'bundle-js',
        'move-js-modules',
        'bundle-sw',
        callback
    );
});


/**
 * Create the watch listeners for JS and SASS, including precacheing upon
 * file changes.
 */
gulp.task('watch', () => {
    gulp.watch(paths.styles, () => {
        runSequence(
            'styles'
        )
    });
    gulp.watch(paths.scripts, () => {
        runSequence(
            'scripts'
        )
    });
    gulp.watch(paths.pug, () => {
        runSequence(
            'build-templates'
        )
    });
});

/**
 * Set the default task to first run styles, scripts, start the precache
 * and then watch for changes to the JS or SASS files.
 */
gulp.task('default', (callback) => {
    runSequence(
      'clean-css',
      'clean-js',
      'clean-html',
      'sass',
      'build-templates',
      'minifycss',
      'bundle-js',
      'move-js-modules',
      'bundle-sw',
      'watch',
      callback
    );
});

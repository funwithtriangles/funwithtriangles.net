'use strict';

// Require things here
var gulp        = require('gulp'),
	concat      = require('gulp-concat'),
	uglify      = require('gulp-uglify'),
	rename      = require('gulp-rename'),
	sass        = require('gulp-sass'),
	maps        = require('gulp-sourcemaps'),
	del         = require('del'),
	browserSync = require('browser-sync').create(),
	prefixer    = require('gulp-autoprefixer'),
	notify		= require('gulp-notify');

// Concatenate js files as listed
gulp.task('concatScripts', function() {

	return gulp.src([
			'js/modules/_header.js'
		])
		.pipe(maps.init())
		.pipe(concat('app.js'))	
		.pipe(maps.write('./'))
		.pipe(gulp.dest('js'))
		.pipe(notify( {message : 'JS compiled.'} ));

});

// Minify app.js file
gulp.task('minifyScripts', ['concatScripts'], function() {

	return gulp.src('js/app.js')
		.pipe(uglify())
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest('js'));

});

// Compile sass
gulp.task('compileSass', function() {

	return gulp.src('scss/app.scss')
		.pipe(maps.init())
		.pipe(sass().on('error', notify.onError(function (error) {
   			return 'An error occurred while compiling sass.\nLook in the console for details.\n' + error;
		})))
		.pipe(prefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
		.pipe(maps.write('./'))
		.pipe(gulp.dest('css'))
		.pipe(browserSync.stream())
		.pipe(notify( {message : 'Sass compiled.'} ));

});

// Refresh browser after JS has concatenated
gulp.task('watchJs', ['concatScripts'], browserSync.reload);

// Cleanup before build by removing certain files
gulp.task('clean', function() {
	del('dist', 'css/app.css*', 'js/app*.js*');
});

// Build /dest folder
gulp.task('build', ['minifyScripts', 'compileSass'], function() {
	return gulp.src(['css/app.css', 'js/app.min.js', 'images/**', 'index.html'], {base: './'})
		.pipe(gulp.dest('dist'));
});

// Start a browser refresh server, watch for JS/SCSS/HTML changes
gulp.task('serve', ['compileSass', 'concatScripts'], function() {

	browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch('scss/**/*.scss', ['compileSass']);
    gulp.watch(['js/app.js', 'js/modules/**'], ['watchJs']);
    gulp.watch("*.html").on('change', browserSync.reload);

});

// Build project for deploy, cleaning first
gulp.task('default', ['clean'], function() {
	gulp.start('build');
});
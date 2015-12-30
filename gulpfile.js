'use strict';

// Require things here
var gulp        	= require('gulp'),
	concat      	= require('gulp-concat'),
	uglify      	= require('gulp-uglify'),
	rename      	= require('gulp-rename'),
	sass        	= require('gulp-sass'),
	maps        	= require('gulp-sourcemaps'),
	del         	= require('del'),
	browserSync 	= require('browser-sync').create(),
	prefixer    	= require('gulp-autoprefixer'),
	notify			= require('gulp-notify'),
	nunjucksRender	= require('gulp-nunjucks-render'),
	ghPages 		= require('gulp-gh-pages'),
	cssnano			= require('gulp-cssnano'),
	file 			= require('gulp-file');

var appPath = 'app/';

// Concatenate js files as listed
gulp.task('concatScripts', function() {

	return gulp.src([
			appPath+'js/vendor/fittext.js',
			appPath+'js/_FWT.js',
			appPath+'js/modules/_TriMask.js',
			appPath+'js/modules/_FlightsMap.js',
			appPath+'js/modules/_Scroll.js'
		])
		.pipe(maps.init())
		.pipe(concat('app.js'))	
		.pipe(maps.write('./'))
		.pipe(gulp.dest(appPath+'js'))
		.pipe(notify( {message : 'JS compiled.'} ));

});


// Compile sass
gulp.task('compileSass', function() {

	return gulp.src(appPath+'scss/app.scss')
		.pipe(maps.init())
		.pipe(sass().on('error', notify.onError(function (error) {
   			return 'An error occurred while compiling sass.\nLook in the console for details.\n' + error;
		})))
		.pipe(prefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
		.pipe(maps.write('./'))
		.pipe(gulp.dest(appPath+'css'))
		.pipe(browserSync.stream())
		.pipe(notify( {message : 'Sass compiled.'} ));

});

gulp.task('compileHtml', function(file) {

	nunjucksRender.nunjucks.configure([appPath+'templates/']);

	// Gets .html and .nunjucks files in pages
	return gulp.src(appPath+'pages/**/*.+(html|nj)')
	// Renders template with nunjucks
	.pipe(nunjucksRender())
	// output files in app folder
	.pipe(gulp.dest(appPath))
})

// Refresh browser after JS has concatenated
gulp.task('watchJs', ['concatScripts'], browserSync.reload);

gulp.task('watchHtml', ['compileHtml'], browserSync.reload);

//Cleanup before build by removing certain files
gulp.task('clean', function() {
	del('dist', 'css/app.css*', 'js/app*.js*');
});

// Build /dest folder
gulp.task('build', ['concatScripts', 'compileSass', 'compileHtml'], function() {

	// Move basic files/folders
	gulp.src([
		appPath+'images/**', 
		appPath+'fonts/**',
		appPath+'index.html',
		appPath+'favicon.ico',
		appPath+'/projects/*'], 
		{base: './app'})
	.pipe(gulp.dest('dist'));

	// Compress CSS
	gulp.src(appPath+'css/app.css')
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css'));

    // Minify JS
    return gulp.src(appPath+'js/app.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));

});

// Start a browser refresh server, watch for JS/SCSS/HTML changes
gulp.task('serve', ['compileSass', 'concatScripts', 'compileHtml'], function() {

	browserSync.init({
       proxy: 'funwithtriangles:8'
    });

    gulp.watch(appPath+'scss/**/*.scss', ['compileSass']);
    gulp.watch([appPath+'js/app.js', appPath+'js/modules/**'], ['watchJs']);
    gulp.watch([appPath+'templates/**/*.nj', appPath+'pages/**/*.nj'], ['watchHtml']);

});

gulp.task('deploy', function() {
  return gulp.src('dist/**/*')
  	.pipe(file('CNAME', 'funwithtriangles.net'))
    .pipe(ghPages({
    	branch: 'master'
    }));
});

// Build project for deploy, cleaning first
gulp.task('default', ['clean'], function() {
	gulp.start('build');
});
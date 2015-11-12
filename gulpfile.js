'use strict';

var gulp = require('gulp'),
	concat = require('gulp-concat');

gulp.task('concatScripts', function() {
	gulp.src([
		'bower_components/jquery/dist/jquery.js',
		'js/modules/_header.js'
	]).pipe(concat('app.js'))
	.pipe(gulp.dest('js'));
});

gulp.task('default', ['hello'], function() {
	console.log('Default');
});
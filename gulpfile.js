'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var log = require('gulplog');
var gutil = require("gulp-util");

var env = gutil.env.env || 'dev';

var entries = [
    'src/index/index.js',
    "src/about/about.js"
];
var distDir = "dist";

gulp.task("default", function(){
    return gulp.start("javascript");
})

gulp.task('javascript', function () {
    var tasks = [];
    for(var i = 0; i < entries.length; i++){
        var src = entries[i];
        // set up the browserify instance on a task basis
        var b = browserify({
        entries: src,
        debug: env == "dev"
        });
    
        var file = src.substr(src.indexOf('/')+1);
        tasks.push(b.bundle()
        .pipe(source(file))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: env == "dev"}))
            // Add transformation tasks to the pipeline here.
            .pipe(uglify())
            .on('error', log.error)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/')));        
    }
    return Promise.all(tasks);
  });

if(env == "dev"){
    gulp.watch('src/*/*.js', ['javascript'])
}
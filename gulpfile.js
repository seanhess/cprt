var gulp = require('gulp')
var less = require('gulp-less')
var concat = require('gulp-concat')
var path = require('path')
var exec = require('child_process').exec
var browserify = require('gulp-browserify')

var paths = {
    ts: ['./public/**/*.ts'],
    less: ['./public/**/*.less'],
    build: './public/build/'
}


gulp.task('less', function() {
    gulp.src(paths.less)
        .pipe(less())
        .pipe(concat('all.css'))
        .pipe(gulp.dest(paths.build))
})

gulp.task('tsc', function(cb) {
    // compile all the files and concatentate them using browserify
    exec('node_modules/.bin/tsc public/app/app.ts -m commonjs -t ES5', function(err, stdout, stderr) {
        console.log(stderr)
        console.log(stdout)
        cb(err)
    })
})

gulp.task('browserify', ['tsc'], function() {
    gulp.src('./public/app/app.js')
        .pipe(browserify())
        .pipe(gulp.dest(paths.build))
})

gulp.task('watch', function() {
    var watcher = gulp.watch(paths.less, ['less'])
    var watcher = gulp.watch(paths.ts, ['browserify'])
})

gulp.task('build', ['browserify', 'less'])
gulp.task('default', ['build', 'watch'])


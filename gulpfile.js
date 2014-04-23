var gulp = require('gulp')
var less = require('gulp-less')
var concat = require('gulp-concat')
var path = require('path')
var exec = require('child_process').exec
var browserify = require('gulp-browserify')
var livereload = require('gulp-livereload')

var paths = {
    ts: ['./public/**/*.ts'],
    js: ['./public/**/*.js'],
    less: ['./public/**/*.less'],
    html: ['index.html', './public/**/*.html'],
    build: './public/build/'
}

gulp.task('less', function() {
    gulp.src(paths.less)
        .pipe(less())
        .pipe(concat('all.css'))
        .pipe(gulp.dest(paths.build))
})

gulp.task('browserify', function() {
    gulp.src('./public/app/app.js')
        .pipe(browserify())
        .pipe(gulp.dest(paths.build))
})

gulp.task('watch', function() {
    var server = livereload()
    gulp.watch(paths.less, ['less']).on('change', onFileChange)
    gulp.watch(paths.js, ['browserify']).on('change', onFileChange)
    gulp.watch(paths.html, []).on('change', onFileChange)

    function onFileChange(file) {
        server.changed(file.path)
    }
})

gulp.task('build', ['browserify', 'less'])
gulp.task('default', ['build', 'watch'])


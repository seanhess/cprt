var gulp = require('gulp')
var less = require('gulp-less')
var concat = require('gulp-concat')
var path = require('path')
var exec = require('child_process').exec
var browserify = require('gulp-browserify')
var livereload = require('gulp-livereload')
var rename = require('gulp-rename')
var react = require('gulp-react')
var gutil = require('gulp-util')

var paths = {
    ts: ['./public/**/*.ts'],
    js: ['./public/**/*.jsx', './public/**/*.js'],
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

gulp.task('compile', function() {
    gulp.src('./public/app/app.jsx', {read:false})
        .pipe(browserify({
            insertGlobals: false,
            transform: ['reactify'],
            extensions: ['.js'],
            debug: true
        })
            .on('error', gutil.beep)
            .on('error', function(err) {
                console.log("BROWSERIFY ERROR", err.message)
            })
        )
        .pipe(rename('app.js'))
        .pipe(gulp.dest(paths.build))
})

gulp.task('watch', function() {
    var server = livereload()

    gulp.watch(paths.less, ['less'])
    gulp.watch(paths.js, ['compile'])

    gulp.watch([paths.html, 'public/build/**']).on('change', function(file) {
        server.changed(file.path)
    })
})

gulp.task('build', ['compile', 'less'])
gulp.task('default', ['build', 'watch'])


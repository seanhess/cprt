var gulp = require('gulp')
var less = require('gulp-less')
var concat = require('gulp-concat')
var path = require('path')

gulp.task('default', function() {
    // place code for your default task here
    console.log("HI")
})


gulp.task('less', function () {
    gulp.src('./public/css/*.less')
        .pipe(less())
        .pipe(concat('all.css'))
        .pipe(gulp.dest('./public/dist/'))
})

gulp.task('watch', function() {
    var watcher = gulp.watch('./public/css/*.less', ['less'])
})


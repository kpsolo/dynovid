'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    twig = require('gulp-twig'),
    browserSync = require('browser-sync'),
    svgSprite = require("gulp-svg-sprite"),
    sassVars = require('gulp-sass-vars'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('css', function () {
    var variables = {
        PathCss: "/"
    }
    return gulp.src('src/scss/main.scss')
    .pipe(sassVars(variables, { verbose: true }))
    .pipe(sass({
        includePaths: require("bourbon").includePaths,
        errLogToConsole: true
    }))
    .pipe(autoprefixer('last 4 version'))
    .pipe(gulp.dest('server/css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('css__static', function () {
    var variables = {
        PathCss: "../"
    }
    return gulp.src('src/scss/main.scss')
    .pipe(sassVars(variables, { verbose: true }))
    .pipe(sass({
        includePaths: require("bourbon").includePaths,
        errLogToConsole: true
    }))
    .pipe(autoprefixer('last 4 version'))
    .pipe(gulp.dest('server/css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('html', function () {
    return gulp.src('src/html/*.twig')
    .pipe(twig({
        data: {
           linkPath: '/' 
        }
    }))
    .pipe(gulp.dest('server'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('html__static', function () {
    return gulp.src('src/html/*.twig')
    .pipe(twig({
        data: {
           linkPath: ''
        }
    }))
    .pipe(gulp.dest('server'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('browser-sync', function() {
    browserSync.init(null, {
        server: {
            baseDir: 'server'
        }
    });
});
gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('svg', function () {
    return gulp.src('src/svg/*.svg')
        .pipe(svgSprite({
            shape: {
                spacing: {
                    padding: 5
                }
            },
            mode: {
                css: {
                    dest: "./",
                    layout: "diagonal",
                    sprite: 'sprite.svg',
                    bust: false,
                    render: {
                        scss: {
                            dest: "../../src/scss/sprite/_sprite.scss",
                            template: "src/scss/tpl/_sprite-template.scss"
                        }
                    }
                }
            },
            variables: {
                mapname: "icons"
            }
        }))
        .pipe(gulp.dest('server/img'))
});

gulp.task('build', ['svg', 'html', 'css']);

gulp.task('build__static', ['svg', 'html__static', 'css__static']);

gulp.task('default', ['html', 'css', 'browser-sync'], function () {
    gulp.watch("src/scss/*/*.scss", ['css']);
    gulp.watch("src/html/**/*.twig", ['html']);
});
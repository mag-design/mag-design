var gulp = require('gulp');
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');
var rimraf = require('gulp-rimraf');
var sourcemaps = require('gulp-sourcemaps');
var LessAutoprefix = require('less-plugin-autoprefix');
var rename = require("gulp-rename");

var autoprefix = new LessAutoprefix();

var paths = [
    'src/css/index.less'
];

gulp.task('clean', function () {
    return gulp.src('dist/*', {read: false})
        .pipe(rimraf());
});

gulp.task('build', ['clean'], function () {
    return gulp.src(paths)
        .pipe(sourcemaps.init())
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(cleanCSS({
            format: {
                breaks: {
                    afterAtRule: true,
                    afterBlockBegins: true,
                    afterBlockEnds: true,
                    afterComment: true,
                    afterProperty: true,
                    afterRuleBegins: true,
                    afterRuleEnds: true,
                    beforeBlockEnds: true,
                    betweenSelectors: true
                  },
                  indentBy: 4,
                  indentWith: 'space',
                  spaces: {
                    aroundSelectorRelation: true,
                    beforeBlockBegins: true,
                    beforeValue: true
                  },
                  wrapAt: false
            }
        }))
        .pipe(rename('mag-design.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist'));
});

gulp.task('build-min', ['clean'], function () {
    return gulp.src(paths)
        .pipe(sourcemaps.init())
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(cleanCSS())
        .pipe(rename('mag-design.min.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['build', 'build-min']);

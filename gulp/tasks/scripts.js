module.exports = function () {
	var babel = require("gulp-babel"),
		minify = require('gulp-minify'),
		concat = require('gulp-concat');

	$.gulp.task('scripts:lib', function () {
		return $.gulp.src(['node_modules/jquery/dist/jquery.min.js', 'node_modules/gsap/dist/ScrollTrigger.min.js', 'node_modules/svgxuse/svgxuse.js', 'node_modules/object-fit-polyfill/dist/object-fit-polyfill.js', 'node_modules/swiper/js/swiper.min.js', 'node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.js'])
			.pipe($.gp.concat('libs.js'))
			.pipe(minify())
			.pipe($.gulp.dest('build/js/'))
			.pipe($.bs.reload({
				stream: true
			}));
	});

	$.gulp.task('scripts', function () {
		return $.gulp.src(['src/dev/js/*.js'])
			.pipe(concat('main.js'))
			.pipe(babel())
			.pipe(minify())
			.pipe($.gulp.dest('build/js/'))
			.pipe($.bs.reload({
				stream: true
			}));
	});
}
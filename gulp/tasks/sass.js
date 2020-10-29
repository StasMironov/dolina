module.exports = function() {
	$.gulp.task('sass', function() {
		return $.gulp.src('src/dev/sass/main.scss')
	//sourcemap initialization
		.pipe($.gp.sourcemaps.init())
		.pipe($.gp.sass())
	//autoprefixer
		.pipe($.gp.autoprefixer({
			browsers: ['last 10 versions']
		}))
	//error message
		.on("error", $.gp.notify.onError({
			message: "Error: <%= error.message %>",
			title: "Ошибка"
		}))
	//minify and concatenation css
		.pipe($.gp.csso())
	//sourcemap complete
		.pipe($.gp.sourcemaps.write('.'))
		.pipe($.gulp.dest('build/css/'))
		.pipe($.bs.reload({
			stream: true
		}));
	});
}
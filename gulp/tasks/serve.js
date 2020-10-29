module.exports = function() {
	$.gulp.task('serve', function() {
		$.bs.init({
			server: {
				baseDir: "./build"
			}
		});
		$.bs.watch('build', $.bs.reload());
	});
}
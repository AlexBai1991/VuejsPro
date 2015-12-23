var ajax = require('../lib/ajax.js');
module.exports = {
	fetchData: function (options, success, failed) {
		if (!options) { return; }
		if (typeof options === 'string') {
			var temp = options;
			options = {
				url: temp
			};
		} else if (typeof options === 'object' && !Array.isArray(options)) {
			if(!options.url) {
				throw new Error('url参数没有填写');
				return;
			}
		} else {
			throw new Error('填写参数有误!');
			return;
		}

		var self = this;
		ajax({
			method: options.method || 'get',
			url: options.url,
			data: options.data || {}
		}, function (data) {
			success && success.call(self, data);
		}, function (err) {
			failed && failed.call(self, err);
		});
	},
};
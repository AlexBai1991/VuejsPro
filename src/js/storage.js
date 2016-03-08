'use strict';

import ajax from './ajax';

export default {
	fetchData(options, success, failed) {
		if (!options) return;
		if (typeof options === 'string') {
			let temp = options;
			options = {
				url: temp
			};
		} else if (typeof options === 'object' && !Array.isArray(options)) {
			if (!options.url) throw new Error('url参数没有填写');
		} else throw new Error('填写参数有误!');

		ajax({
			method: options.method || 'get',
			url: options.url,
			data: options.data || {}
		}, data => {
			success && success.call(this, data);
		}, err => {
			failed && failed.call(this, err);
		});
	}
};
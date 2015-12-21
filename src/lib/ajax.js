module.exports = ajax;
function ajax (option, success, failed) {

	function getData (obj) {
		if (!obj.length) {
			return;
		}
		var res = [];
		for (var name in obj) {
			res.push(name + '=' + obj[name]);
		}
		return obj.join('&');
	}
	// option => {}
	// xhr对象
	var xhr,
		method = option.method || 'get',
		url = option.url,
		data = option.data || {};

	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}
	if (method === 'get' && data.length) {
		url += '?'+getData(data);
	}
	xhr.open(method, url, true);
	if (method === 'get') {
		xhr.send(null);
	} else if (method === 'post') {
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.send(getData(data));
	}
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
				var resJson = JSON.parse(xhr.responseText);
				success && success.call(this, resJson);
			} else {
				failed && failed(xhr.status);
			}
		}
	};
}
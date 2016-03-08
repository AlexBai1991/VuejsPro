'use strict';

export default function ajax(option, success, failed) {
  function getData (obj) {
    let res = [];
    for (let name in obj) {
      res.push(name + '=' + obj[name]);
    }
    return res.join('&');
  }
  // option => {}
  // xhr对象
  let xhr,
    method = option.method || 'get',
    url = option.url,
    data = option.data || {};

  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject('Microsoft.XMLHTTP');
  }
  if (method === 'get' && data.length) {
    url += '?' + getData(data);
  }
  xhr.open(method, url, true);
  if (method === 'get') {
    xhr.send(null);
  } else if (method === 'post') {
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    data = getData(data);
    xhr.send(data);
  }
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
        let resJson = JSON.parse(xhr.responseText);
        success && success.call(this, resJson);
      } else {
        failed && failed(xhr.status);
      }
    }
  };
}

import config from "../../config.js";
import { serialize } from "./url_core.js";


function fetchGet(url, data = {}, ctx) {
  const requestUrl = `${config.backend.url}${url}?${serialize(data)}`;


  var headers = {};

  return fetch(requestUrl, { headers })
    .then(res => {
      if (res.status === 401) window.location.href = '/login';

      if (!res.ok) {
        const err = new Error(requestUrl + ':' + res.statusText);
        err.res = res;
        throw err;
      }

      __DEV__ && console.log('%c' + requestUrl, 'color: green');

      return res.json();
    });
}

function fetchPost(url, data = {}, type = 'form', option = {}) {

  const formData = new FormData();

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      formData.append(key, data[key]);
    }
  }

  const requestUrl = (option.url || config.backend.url) + url;
  const headers = {};
  if (type === 'json') {
    headers.Accept = 'application/json';
    // NOTE :access-control-allow-headers 列表中不存在请求标头content-type
    headers['Content-Type'] = 'application/json';
  }

  return fetch(requestUrl, {
    method: 'POST',
    headers,
    body: type === 'form' ? formData : typeof data === 'object' ? JSON.stringify(data) : data,
  })
    .then(res => {
      if (!res.ok) {
        const err = new Error(requestUrl + ':' + res.statusText);
        err.res = res;
        throw err;
      }
      return res.json();
    });
}


export {
  fetchGet, fetchPost
}
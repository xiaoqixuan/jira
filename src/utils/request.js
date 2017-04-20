import 'whatwg-fetch';

// const Host = 'http://10.112.68.14:8080/jiraexpand';
 const Host = '/jiraexpand';

function jsonToQueryString(json) {
    return Object.keys(json).map(function (key) {
        return encodeURIComponent(key) + '=' +
            encodeURIComponent(json[key]);
    }).join('&');
}

function getData(Vue, options) {
    return function (_url, _data) {
        return new Promise(function (resolve, reject) {
            fetch(Host + _url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    "User-SessionID": window.localStorage.sessionId || "",
                },
                body: JSON.stringify(_data)
            }).then(function (_res) {
                return _res.json();
            }).then(function (_data) {
                resolve(_data);
            }).catch(function (err) {
                console.log("请求错误:", err);
                reject(err);
            })
        })
    }
}

const vueRequest = {};
vueRequest.install = function (Vue, options) {
    Vue.prototype.getData = getData(Vue.options); // 附在原型
}

export default vueRequest;
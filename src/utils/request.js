import 'whatwg-fetch';

const Host = 'http://123.56.19.153';

function jsonToQueryString(json) {
    return Object.keys(json).map(function (key) {
        return encodeURIComponent(key) + '=' +
            encodeURIComponent(json[key]);
    }).join('&');
}

function getData(_url, _data) {
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
            switch (_data.code) {
                case 200:
                    if (_data.sessionId) {
                        window.localStorage.sessionId = _data.sessionId;
                    }
                    resolve(_data);
                    break;
                case 401:
                    reject(_data.remark);
                    break;
                case 404:
                    reject(_data.remark);
                    break;
                case 408:
                    reject(_data.remark);
                    break;
                default:
                    reject(_data.remark);
            }
        }).catch(function (err) {
            console.log("请求错误:", err);
            reject(err);
        })
    })
}

const vueRequest = {};
vueRequest.install = function (Vue, options) {
    Vue.prototype.getData = getData; // 附在原型
}

export default vueRequest;
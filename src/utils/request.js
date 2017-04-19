import 'whatwg-fetch';

// const Host = '';
const Host = 'http://10.128.25.70:8080';

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
                switch (_data.code) {
                    case 200:
                        if (_data.sessionId) {
                            window.localStorage.sessionId = _data.sessionId;
                        }
                        resolve(_data);
                        break;
                    case 401:
                        // Vue.$router.push('/login');
                        window.location.assign('/#/login');
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
}

const vueRequest = {};
vueRequest.install = function (Vue, options) {
    Vue.prototype.getData = getData(Vue.options); // 附在原型
}

export default vueRequest;
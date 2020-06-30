// 不需要base64加密请求方法
import Conf from '@/config';
import axios from 'axios';
// import qs from 'qs';
import '@/util/lib';

let baseURL = Conf.ipH5;
let timeout = Conf.timeout;
axios.defaults.timeout = timeout; // 请求超时时间

export default function (type = 'get', url, obj) {
    return new Promise((resolve, reject) => {
        let typeLc = type.toLowerCase();
        let config = {
            method: typeLc,
            url: baseURL + url
        };

        // obj可能为空
        if (!obj) {
            obj = {};
        }

        // headers只有在跟注册 登陆相关的接口才有
        if (obj && Object.prototype.hasOwnProperty.call(obj, 'headers')) {
            config.headers = obj.headers;
        } else if (localStorage.getItem('jwt')) {
            config.headers = {
                Authorization: `Bearer${localStorage.getItem('jwt')}`
            }
        }
        if (typeLc === 'get') {
            config.params = obj;
        } else if (typeLc === 'post') {
            config.data = obj;
        }

        axios(config)
            .then((response) => {
                if (response) {
                    console.log('请求url：', url, '\n请求参数：', obj, '\n返回结果:', response.data)
                    resolve(response.data);
                } else {
                    reject(response);
                }
            })
            .catch((err) => {
                reject(err);
            });
    });
}
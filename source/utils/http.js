import axios from 'axios';
import proxySetting from '../../tools/proxySetting';
export const cancelToken = axios.CancelToken;

const http = axios.create({
    timeout: 3000,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    transformRequest: [
        function (data) {
            let ret = '';
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
            }
            return ret;
        }
    ]
});

function getRequestUrl(url) {
    if (process.env.REACT !== 'server') return url;
    for(let key in proxySetting){
        if(new RegExp('^'+key).test(url)){
            return proxySetting[key]+url;
        }
    }
    // if (/^\/API/.test(url)) {
    //     return 'http://192.168.20.151:9000' + url;
    // }
    // if(/^\/auth/.test(url)){
    //     return 'http://192.168.20.146:3000/mock/115'+url
    // }
    return url;
}

http.interceptors.request.use(function (config) {
    config.url = getRequestUrl(config.url);
    return config;
});
http.interceptors.response.use((response) => {
    return response.data;
});
export default http;

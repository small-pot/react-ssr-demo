import axios from 'axios';


const http=axios.create({
  timeout:3000,
  headers:{'Content-Type': 'application/x-www-form-urlencoded'},
  transformRequest:[
    function (data) {
      let ret = '';
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
      }
      return ret;
    }
  ]
})
function getRequestUrl(url) {
    if(process.env.REACT!=='server') return url;
    if(/^\/API/.test(url)){
        return 'http://192.168.20.151:9000'+url
    }
    return url
}
http.interceptors.request.use(function (config) {
    config.url=getRequestUrl(config.url)
    return config;
});
http.interceptors.response.use((response) => {
  return response.data;
})
export default function(opt){
  return new Promise((resolve, reject) => {
    http(opt).then(res=>{
      if(res.success){
        resolve(res.data)
      }else{
        reject(res)
      }
    })
  })
};

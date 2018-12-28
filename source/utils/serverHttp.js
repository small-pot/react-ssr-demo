import http from './http'

// const serverHttp=axios.create({
//     timeout:3000,
// })
// serverHttp.interceptors.request.use(function (config) {
//     config.url=getRequestUrl(config.url)
//     return config;
// });
// serverHttp.interceptors.response.use((response) => {
//     const data=response.data
//     if(data.success&&data.code===200){
//         return data.data
//     }else{
//         return data
//     }
// })
// function getRequestUrl(url) {
//     if(/^\/API/.test(url)){
//         return 'http://192.168.20.151:9000'+url
//     }
//     return url
// }
export default function (req,opt) {
    return http({
        headers:{
            cookie:req.headers.cookie||null,
        },
        ...opt
    })
}

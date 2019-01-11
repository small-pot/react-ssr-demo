//server端请求
import serverHttp from '#/serverHttp';

export default async function (req) {
    let data=await serverHttp(req,{
        method:'get',
        url:'/auth/researcher/beikepkg/leke/share/details.htm'
    });
    console.log(data.data);
    return {test:{list:data.data}};
}
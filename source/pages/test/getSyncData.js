//server端请求
import serverHttp from '#/serverHttp';

export default async function (req) {
    let data=await serverHttp(req,{
        method:'get',
        url:'/auth/researcher/beikepkg/leke/share/details.htm'
    });
    return {test:{list:data.data}};
}
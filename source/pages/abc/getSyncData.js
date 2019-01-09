//server端请求
import serverHttp from '#/serverHttp'
import {timeFormat} from "../../utils/tools";

export default async function (req) {
    let data=await serverHttp(req,{
        method:'get',
        url:'/API/Attendance/getTime.htm'
    })
    return {abc:{time:timeFormat(data,'YYYY-MM-DD')}}
}
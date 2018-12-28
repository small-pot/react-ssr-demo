import http from './http'
const o={};
export default async function (opt) {
  const key=`${opt.method} ${opt.url}`
  if(o[key]){
    return o[key]
  }
  return o[key]=await http(opt);
}
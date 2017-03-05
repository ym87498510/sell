/**
 * Created by edison on 2017/3/5.
 * 解析url中的参数
 * @example ?id=1232&name=jack
 * retrun Object {id:1231,name:'jack'}
 */

export const urlParse = () => {
  let url = window.location.search
  let obj = {}
  let reg = /[?&][^?&]+=[^?&]+/g
  let arr = url.match(reg)
  if (!arr) return obj
  // ['id=1232','&name=jack']
  arr.forEach((item) => {
    let temp = item.substr(1).split('=')
    let key = decodeURIComponent(temp[0])
    let val = decodeURIComponent(temp[1])
    obj[key] = val
  })
  return obj
}

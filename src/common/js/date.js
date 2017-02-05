export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    // 匹配y+，替换成年份，转化成字符串，并按y但个数从后面截取
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}
// 拼完后截取最后两位
function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

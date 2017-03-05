/**
 * Created by edison on 2017/3/5.
 * 定义一个存取localStorage的方法
 */
let store = window.localStorage
export const saveToLocal = (id, key, value) => {
  let seller = store.__seller__
  if (!seller) {
    seller = {}
    seller[id] = {}
    seller[id][key] = value
  } else {
    seller = JSON.parse(seller)
    if (!seller[id]) {
      seller[id] = {}
    }
  }
  seller[id][key] = value
  store.__seller__ = JSON.stringify(seller)
}
// def 为默认数据
export const getFromLocal = (id, key, def) => {
  let seller = store.__seller__
  if (!seller) {
    return def
  }
  seller = JSON.parse(seller)[id]
  if (!seller) {
    return def
  }
  return seller[key] || def
}

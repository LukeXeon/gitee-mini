import queryString from 'query-string'

export default {
  request(method, url, type, body, headers) {
    return new Promise((resolve, reject) => {
      mpvue.request({
        url,
        method,
        headers,
        dataType: type,
        success: resolve,
        fail: reject,
      });
    })
  },
  setValue(key, value) {
    return new Promise((resolve, reject) => {
      mpvue.setStorage({
        key: key,
        data: value,
        success: resolve,
        fail: reject
      });
    })
  },
  getValue(key) {
    return new Promise((resolve, reject) => {
      mpvue.getStorage({
        key,
        success: resolve,
        fail: reject
      });
    })
  },
  removeKey(key) {
    return new Promise((resolve, reject) => {
      mpvue.removeStorage({
        key,
        success: resolve,
        fail: reject,
      });
    })
  },
  redirectTo(toUrl, query) {
    return new Promise((resolve, reject) => {
      mpvue.redirectTo({
        url: `${toUrl}?${queryString.stringify(query)}`,
        success: resolve,
        fail: reject,
      })
    })
  },
  navigateTo(toUrl, query){
    return new Promise((resolve, reject) => {
      mpvue.navigateTo({
        url: `${toUrl}?${queryString.stringify(query)}`,
        success: resolve,
        fail: reject,
      })
    })
  },
  getClipboard() {
    return new Promise((resolve, reject) => {
      mpvue.getClipboard({
        success: resolve,
        fail: reject,
      });
    })
  },
  confirm(title, content, confirmButtonText, cancelButtonText) {
    return new Promise((resolve, reject) => {
      mpvue.confirm({
        title,
        content,
        confirmButtonText,
        cancelButtonText,
        success: resolve,
        fail: reject
      });
    })
  },
  alert(title, content, buttonText) {
    return new Promise((resolve, reject) => {
      mpvue.alert({
        title,
        content,
        buttonText,
        success: resolve,
        fail: reject,
      });
    })
  }
}

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
  },
  getValue(key) {
  },
  removeKey(key) {

  },
  animate(vnode, options) {

  },
  jumpTo(toUrl, query) {

  },
  copy(text) {
  },
  getClipboard() {

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

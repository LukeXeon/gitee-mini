import colors from "../resouces/colors";

export default {
  getQueryVariable(url, variable) {
    let urlParams = url.split("?")[1];
    //或者url.search获取参数字符串
    let paramArray = urlParams.split("&");
    let len = paramArray.length;
    let paramObj = {};//json对象
    let arr = [];//数组对象
    for (let i = 0; i < len; i++) {
      arr = paramArray[i].split("=");
      paramObj[arr[0]] = arr[1];
    }
    for (let key in paramObj) {
      if (key === variable) {
        return paramObj[variable];
      }
    }
  },
  getRandomColor() {
    return '#' + '0123456789abcdef'.split('')
      .map(function (v, i, a) {
        return i > 5 ? null : a[Math.floor(Math.random() * 16)]
      }).join('');
  },
  getLanguageColor(lang) {
    let colorItem = colors[lang]
    let color = null
    if (colorItem) {
      color = colorItem['color']
    }
    color = color || '#dddddd'
    return color
  },
  timeout(time) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve()
      }, time)
    })
  },
}

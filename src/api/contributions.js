import dayjs from "dayjs";
import {parse} from 'expression-eval';
import utils from "../utils";


export default {
  async getContributions(username) {
    const url = `https://gitee.com/${username}/contribution_calendar?year=`
    let response = await utils.request("GET", url, 'text', null, {
      'content-type': 'application/x-www-form-urlencoded',  //默认值
      Accept: '*/*',
      'X-Requested-With': 'XMLHttpRequest',
    })
    let content = response.data;
    const head = "$contributionContainer.html("
    let index = content.indexOf(head)
    let index2 = content.lastIndexOf(");")
    content = content.substring(index + head.length, index2)
    content = parse(content).value
    let document = utils.createDocument(content)

    function getAttribute(node, name) {
      for (let i = 0; i < node.attrs.length; i++) {
        let attr = node.attrs[i];
        if (attr.name === name) {
          return attr.value;
        }
      }
      return null;
    }

    let now = parseInt(dayjs(new Date()).format('YYYYMMDD'))

    function find(node, list = []) {
      if (node.tagName === 'div' && node.attrs && node.attrs.length && now >= parseInt(getAttribute(node, 'date'))) {
        if (getAttribute(node, 'data-content')) {
          list.push({
            color: getAttribute(node, 'class').split(' ')[1],
            text: getAttribute(node, 'data-content')
          });
        }
      }
      if (node.childNodes && node.childNodes.length) {
        for (let i = 0; i < node.childNodes.length; i++) {
          let child = node.childNodes[i];
          find(child, list);
        }
      }
      return list;
    }

    let result = find(document);
    console.log(result);
    return result
  },
}

import parse5 from 'parse5'

export default {
  createDocument(content) {
    let html = "<html><head><title></title></head><body>" + content + "</body></html>"
    return parse5.parse(html);
  }
}

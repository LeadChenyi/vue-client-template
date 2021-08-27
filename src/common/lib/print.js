'use strict'
/* eslint-disable */
exports.__esModule = true
var vue_1 = require('vue')
var Print = /** @class */ (function () {
  function Print(dom) {
    if (dom instanceof HTMLElement) {
      this.dom = dom
    } else if (dom instanceof vue_1['default']) {
      this.dom = dom.$el
    } else if (typeof dom === 'string') {
      this.dom = document.querySelector(dom)
    } else {
      // TODO
    }
    this.init()
  }
  Print.prototype.init = function () {
    var style = this.getStyle()
    var html = this.dom.outerHTML
    var content = style + html
    this.iframePrint(content)
  }
  // 获取link 和 style
  Print.prototype.getStyle = function () {
    var styleString = ''
    var styles = document.querySelectorAll('style,link')
    styles.forEach(function (style) {
      styleString += style.outerHTML
    })
    return styleString
  }
  // 通过 iframe 打印
  Print.prototype.iframePrint = function (content) {
    var iframe = document.createElement('iframe')
    iframe.setAttribute('style', 'position:absolute;width:0;height:0;top:-100%;left:-100%;')
    var el = document.body.appendChild(iframe)
    var _window = el.contentWindow
    var _document = el.contentDocument || el.contentWindow.document
    _document.open()
    _document.write(content)
    _document.close()
    iframe.onload = function () {
      _window.print()
    }
  }
  return Print
}())

exports['default'] = {
  install: function (Vue) {// Vue.use 全局注册方式
    Vue.prototype.$print = function (dom) { return new Print(dom) }
  },// 局部引用方式
  action(dom) { return new Print(dom) }
}


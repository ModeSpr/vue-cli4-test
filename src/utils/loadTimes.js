window.logInfo = {} // 统计页面加载时间
window.logInfo.openTime = performance.timing.navigationStart
window.logInfo.whiteScreenTime = +new Date() - window.logInfo.openTime + 'ms'
document.addEventListener('DOMContentLoaded', function () {
  window.logInfo.readyTime = +new Date() - window.logInfo.openTime + 'ms'
})
window.onload = function () {
  window.logInfo.allloadTime = +new Date() - window.logInfo.openTime + 'ms'
  window.logInfo.device = currDevice()
  window.logInfo.nowTime = new Date().getTime()
  var timname = {
    whiteScreenTime: '白屏时间',
    readyTime: '用户可操作时间',
    allloadTime: '总下载时间'
    // device: '使用设备',
    // nowTime: '时间',
  }
  // var logStr = ''
  for (var i in timname) {
    console.warn(timname[i] + ':' + window.logInfo[i])
    // logStr += '&' + i + '=' + window.logInfo[i]
  }
  // (new Image()).src = '/action?' + logStr;
}

function currDevice () {
  var u = navigator.userAgent
  // var app = navigator.appVersion// appVersion 可返回浏览器的平台和版本信息。该属性是一个只读的字符串。
  // var browserLang = (navigator.browserLanguage || navigator.language).toLowerCase()	// 获取浏览器语言
  switch (u) {
    case u.indexOf('Trident') > -1: // IE内核
      return 'IE'
    case u.indexOf('Presto') > -1: // opera 内核
      return 'opera'
    case u.indexOf('AppleWebKit') > -1: // 苹果、谷歌内核
      return 'webKit'
    case u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1: // 火狐内核
      return 'gecko'
    case !!u.match(/AppleWebKit.*Mobile.*/): // 是否为移动终端
      return 'mobile'
    case !!u.match(/\(i[^;]+;( U;)? CPU.Mac OS X/): // ios终端
      return 'ios'
    case u.indexOf('Android') > -1 || u.indexOf('Linux') > -1: // android终端或者uc浏览器
      return 'android'
    case u.indexOf('iPhone') > -1: // 是否为iPhone或者QQHD浏览器
      return 'iPhone'
    case u.indexOf('iPad') > -1: // 是否iPad
      return 'iPad'
    case u.indexOf('Safari') > -1: // 是否web应用程序，没有头部和底部
      return 'Safari'
    case u.indexOf('MicroMessenger') > -1: // 是否微信
      return 'weixin'
    case u.match(/\sQQ/i) === ' qq': // 是否QQ
      return 'qq'
    default:
      return 'other'
  }
}

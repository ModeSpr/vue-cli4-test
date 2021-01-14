// 自动返回现在和输入日期过了多少时间
export function getDateDiff (dateTimeStamp) {
  if (typeof dateTimeStamp === 'string') {
    dateTimeStamp = new Date(dateTimeStamp.replace(/-/g, '/'))
  }
  var minute = 1000 * 60
  var hour = minute * 60
  var day = hour * 24
  // var halfamonth = day * 15
  // var month = day * 30
  // var year = day * 365
  var now = new Date().getTime()
  var diffValue = now - dateTimeStamp.getTime()
  if (diffValue === 0) {
    // 非法操作
    return '数据出错'
  }
  // var yearC = diffValue / year
  // var monthC = diffValue / month
  // var weekC = diffValue / (7 * day)
  var dayC = diffValue / day
  var hourC = diffValue / hour
  var minC = diffValue / minute
  var result
  // if (yearC >= 1) {
  //   result = parseInt(yearC) + '年以前';
  // } else if (monthC >= 1) {
  //   result = parseInt(monthC) + '个月前';
  // } else if (weekC >= 1) {
  //   result = parseInt(weekC) + '星期前';
  // } else if (dayC >= 1) {
  //   result = parseInt(dayC) + '天前';
  // } else if (hourC >= 1) {
  //   result = parseInt(hourC) + '小时前';
  // } else if (minC >= 5) {
  //   result = parseInt(minC) + '分钟前';
  // } else {
  //   result = '刚刚发表';
  // }
  if (dayC >= 1) {
    return formatDateTime(dateTimeStamp, 'YYYY-MM-DD')
  } else if (hourC >= 1) {
    result = parseInt(hourC) + '小时前'
  } else if (minC >= 5) {
    result = parseInt(minC) + '分钟前'
  } else if (minC < 5) {
    result = '刚刚发表'
  }
  return result
}

export function formatDate (date) {
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  var d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  return y + '-' + m + '-' + d
}

// 时间戳转日期格式
export function formatDateTime (time, format = 'YYYY-MM-DD hh:mm:ss') {
  var t = new Date(time)
  var tf = function (i) { return (i < 10 ? '0' : '') + i }
  return format.replace(/YYYY|MM|DD|hh|mm|ss/g, function (a) {
    switch (a) {
      case 'YYYY':
        return tf(t.getFullYear())

      case 'MM':
        return tf(t.getMonth() + 1)

      case 'DD':
        return tf(t.getDate())

      case 'hh':
        return tf(t.getHours())

      case 'mm':
        return tf(t.getMinutes())

      case 'ss':
        return tf(t.getSeconds())
    }
  })
}

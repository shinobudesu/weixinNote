const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  let r = '';
  switch (true) {
    case hour > 0 && hour < 8:
      r = '凌晨';
      break;
    case hour >= 8 && hour < 12:
      r = '上午';
      break;
    case hour >= 12 && hour < 18:
      r = '下午';
      break;
    case hour >= 18 && hour < 24:
      r = '傍晚';
      break;
    default:
      break;
  }
  
  return `${month}月${day}日 ${r}${hour}:${minute}`
}

const formatTime2 = date => {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1)
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  formatTime2: formatTime2
}

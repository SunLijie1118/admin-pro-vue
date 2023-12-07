export const timeFix = () => {
  const time = new Date();
  const hour = time.getHours();
  if (hour < 9) {
    return '早上好';
  } else if (hour <= 11) {
    return '上午好';
  } else if (hour <= 13) {
    return '中午好';
  } else if (hour <= 19) {
    return '下午好';
  } else {
    return '晚上好';
  }
}

export const welcome = () => {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了'];
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

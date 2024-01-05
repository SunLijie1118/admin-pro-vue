/**
 * 将数值转换为 万、亿, 字符串格式的数值会被自动转换为数值， 如果转换失败则显示 NaN
 * @param input 传入的数值
 * @param digits 保留小数位数，默认保留两位
 * @returns 转换单位后的数值
 */

export default {
  install: (app: any) => {
    app.config.globalProperties.$countTransform = (input: number, digits = 2) => {
      if (input === null || input === undefined) {
        return '';
      }
      if (isNaN(Number(input)) || !input) {
        return input.toString();
      }
      input = Number(input);

      if (input < Math.pow(10, 4)) {
        return String(input);
      }
      if (input < Math.pow(10, 8)) {
        return (input / Math.pow(10, 4)).toFixed(digits) + '万';
      }
      return (input / Math.pow(10, 8)).toFixed(digits) + '亿';
    }
  }
}

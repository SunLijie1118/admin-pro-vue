/**
 * 计算传入日期距离现在有多久，自动转化单位为秒、分钟、小时、天、月、年
 * @param dateStr 日期格式为2023-12-06
 * @returns 距离现在有多长时间
 */

export default {
  install: (app: any) => {
    app.config.globalProperties.$dateToToday = (dateStr: string) => {
      const givenDate = new Date(dateStr);
      const currentDate = new Date();
      const difference = currentDate.getTime() - givenDate.getTime();

      // Convert milliseconds to minutes, hours, days, months, and years
      const minutes = Math.floor(difference / 60000);
      const hours = Math.floor(minutes / 60);
      let years = currentDate.getFullYear() - givenDate.getFullYear();
      let months = currentDate.getMonth() - givenDate.getMonth();
      let days = currentDate.getDate() - givenDate.getDate();

      // Adjust for month and year differences
      if (days < 0) {
        months--;
        const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        days += previousMonth.getDate();
      }

      if (months < 0) {
        years--;
        months += 12;
      }

      // Choose the largest unit with a non-zero value
      if (years > 1) {
        return `${years} 年前`;
      } else if (months > 1) {
        return `${months} 月前`;
      } else if (days > 1) {
        return `${days} 天前`;
      } else if (Math.abs(hours) >= 1) {
        return `${hours} 小时前`;
      } else if (Math.abs(minutes) >= 1) {
        return `${minutes} 分钟前`;
      } else {
        return `${Math.floor(difference / 1000)} 秒前`;
      }
    }
  }
}

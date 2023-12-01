import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL as string;

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL,
  // 设置默认的超时时间
  timeout: 30 * 60 * 1000,
});

export default request;

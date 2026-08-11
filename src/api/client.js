import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg = err.response?.data?.message || err.message || 'حدث خطأ في الاتصال بالخادم';
    console.error('[API Error]', err.config?.url, '→', msg);
    return Promise.reject(new Error(msg));
  }
);

export default apiClient;

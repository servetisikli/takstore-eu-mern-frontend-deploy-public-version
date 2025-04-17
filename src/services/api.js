import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  Headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;


// Token Refresh
// import axios from "axios";

// export const API_URL = import.meta.env.VITE_API_URL;

// const api = axios.create({
//   baseURL: API_URL,
//   headers: { // Küçük harf "headers" olmalı (Büyük harf yanlış!)
//     "Content-Type": "application/json",
//   },
//   withCredentials: true, // HttpOnly Cookie'leri kullanabilmek için gerekli
// });

// // 🛠 Response Interceptor: Access Token süresi dolarsa, Refresh Token ile yenile
// api.interceptors.response.use(
//   (response) => response, // Başarılı isteklerde değişiklik yapma
//   async (error) => {
//     const originalRequest = error.config;

//     // Eğer 401 Unauthorized hatası alırsak ve daha önce retry edilmediyse
//     if (error.response && error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true; // Tekrar denediğimizi işaretle

//       try {
//         // Yeni Access Token almak için Refresh Token isteği yap
//         await axios.post(`${API_URL}/user/refresh-token`, {}, { withCredentials: true });

//         // Yeni Access Token artık Cookie içinde saklanacak, isteği tekrar dene
//         return api(originalRequest);
//       } catch (refreshError) {
//         console.error("Session expired. Please log in again.");
//         window.location.href = "/login"; // Kullanıcıyı giriş sayfasına yönlendir
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;
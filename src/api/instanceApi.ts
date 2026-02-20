import axios from "axios";
// import axiosRetry from 'axios-retry';


const baseURL = import.meta.env.VITE_BASE_URL;
const fallbackURL = import.meta.env.VITE_SECONDARY_URL;
// const baseURL = "http://localhost:5001/";


export const axiosInstanceApi = axios.create({
    baseURL,
    withCredentials: false,
    timeout: 20000
});

axiosInstanceApi.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        // Проверяем, не пробовали ли уже использовать fallback
        if (!originalRequest._retry) {
            originalRequest._retry = true;

            // Меняем baseURL на fallback
            const originalBaseURL = originalRequest.baseURL || baseURL;
            originalRequest.baseURL = fallbackURL;
            originalRequest.url = originalRequest.url.replace(originalBaseURL, "");

            try {
                // Повторяем запрос с новым URL
                return await axiosInstanceApi(originalRequest);
            } catch (fallbackError) {
                // Если и fallback не работает, возвращаем оригинальную ошибку
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);


// axiosRetry(axiosInstanceAdm, {
//   retries: 3,
//   retryCondition: error => {
//     return !error.response;
//   },
//   retryDelay: retryCount => {
//     return retryCount * 1000;
//   },
// });
// // Регистрируем интерцепторы для запросов и ответов
// axiosInstanceAdm.interceptors.request.use(
//   config => {
//     // Тут можно модифицировать конфиг перед отправкой запроса
//     console.log('interceptors', config);
//     return config;
//   },
//   error => {
//     // Обработка ошибок перед отправкой запроса
//     return Promise.reject(error);
//   },
// );
// axiosInstanceAdm.interceptors.response.use(
//   response => {
//     console.log('response', response);
//     // Тут можно модифицировать ответ после получения его от сервера
//     return response;
//   },
//   error => {
//     // Обработка ошибок после получения ответа от сервера
//     const originalRequest = error.config;
//     console.log('originalRequest', error);
//     // Если код ошибки 5xx (серверная ошибка), повторяем запрос
//     if (error.response.status >= 500 && error.response.status < 600) {
//       return axiosInstanceAdm(originalRequest);
//     }
//
//     // Если код ошибки 429 (слишком много запросов), повторяем запрос через 5 секунд
//     if (error.response.status === 429) {
//       return new Promise(resolve => {
//         setTimeout(() => resolve(axiosInstanceAdm(originalRequest)), 5000);
//       });
//     }
//
//     // Возвращаем ошибку, если код ошибки не 5xx или 429
//     return Promise.reject(error);
//   },
// );

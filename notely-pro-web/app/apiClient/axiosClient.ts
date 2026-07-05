import axios from "axios";
import { getCookie, setCookie } from "cookies-next";


export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },

})

//  Request interceptor to add the auth token to the request headers

apiClient.interceptors.request.use((config) => {
    const token = getCookie("auth_token")
    if (token && config.headers) {
        config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
}, (error) => Promise.reject(error))
// Response interceptor to handle errors and log them

apiClient.interceptors.response.use((response) => {
    return response.data
}, async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        try {
            // Call refresh endpoint to get new token

            const refreshResponse = await axios.post('/api/auth/refresh', {
                refreshToken: getCookie('refresh_token'),
            });
            const { accessToken } = refreshResponse.data;

            setCookie('access_token', accessToken);
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;

            return apiClient(originalRequest);
        } catch (refreshError) {
            setCookie('access_token', '');
            setCookie('refresh_token', '');
            window.location.href = '/login';
            return Promise.reject(refreshError);
        }
    }
    return Promise.reject(error)
})


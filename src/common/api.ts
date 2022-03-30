import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { FetchPositions, FetchToken } from '@/types/store/info';
import {
  FetchRegisterUser, FetchUsers, FetchUser,
} from '@/types/store/users';

const apiURL = 'https://frontend-test-assignment-api.abz.agency/api/v1';
export const tokenUrl = `${apiURL}/token`;

// Используется для получения нового токена если он истек
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    // Получили ошибку токена
    if (error.response.status === 401) {
      // eslint-disable-next-line no-underscore-dangle
      originalRequest._retry = true;
      // Получаем новый токен
      return axios.get(tokenUrl)
        // eslint-disable-next-line consistent-return
        .then((res) => {
          if (res.status === 200) {
            const { data } = res;
            localStorage.setItem('token', data.token);

            // Изменяем Authorization header
            axios.defaults.headers.common.Authorization = `Token ${localStorage.getItem('token')}`;

            // Возвращаем объект originalRequest с помощью Axios.
            return axios(originalRequest);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }

    // Вернуть объект ошибки с Промисом
    return Promise.reject(error);
  },
);

// Юзаем interceptor для ввода токена в запросы
axios.interceptors.request.use((request) => {
  if (request.headers) {
    // eslint-disable-next-line no-param-reassign
    request.headers.Authorization = `Token ${localStorage.getItem('token')}`;
  }
  return request;
});

class Api {
  public apiClient: AxiosInstance;

  constructor() {
    this.apiClient = axios.create({
      baseURL: apiURL,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Token: localStorage.getItem('token') ?? '',
      },
    });
  }

  getPositions(): Promise<AxiosResponse<FetchPositions, any>> {
    return this.apiClient.get<FetchPositions>('/positions');
  }

  getUsers(page: number): Promise<AxiosResponse<FetchUsers, any>> {
    return this.apiClient.get<FetchUsers>('/users', {
      params: {
        page,
        count: 6,
      },
    });
  }

  registerUser(user: FormData): Promise<AxiosResponse<FetchRegisterUser, any>> {
    return this.apiClient.post<FetchRegisterUser>('/users', user, {
      headers: {
        Accept: '*/*',
        'Content-Type': 'multipart/form-data',
        Token: localStorage.getItem('token') ?? '',
      },
    });
  }

  getToken(): Promise<AxiosResponse<FetchToken, any>> {
    return this.apiClient.get<FetchToken>('/token');
  }
}

export const API = new Api();

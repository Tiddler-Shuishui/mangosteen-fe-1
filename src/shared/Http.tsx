import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'
import {
  Mock,
  mockItemCreate,
  mockItemIndex,
  mockItemIndexBalance,
  mockItemSummary,
  mockSession,
  mockTagEdit,
  mockTagIndex,
  mockTagShow,
} from '../mock/mock'

type GetConfig = Omit<AxiosRequestConfig, 'params' | 'url' | 'method'>
type PostConfig = Omit<AxiosRequestConfig, 'url' | 'data' | 'method'>
type PatchConfig = Omit<AxiosRequestConfig, 'url' | 'data'>
type DeleteConfig = Omit<AxiosRequestConfig, 'params'>

export class Http {
  instance: AxiosInstance
  constructor(baseURL: string) {
    this.instance = axios.create({ baseURL })
  }
  // read
  get<R = unknown>(
    url: string,
    query?: Record<string, string | number>,
    config?: GetConfig
  ) {
    return this.instance.request<R>({
      ...config,
      url,
      params: query,
      method: 'get',
    })
  }
  // create
  post<R = unknown>(
    url: string,
    data?: Record<string, JSONValue>,
    config?: PostConfig
  ) {
    return this.instance.request<R>({ ...config, url, data, method: 'post' })
  }
  // update
  patch<R = unknown>(
    url: string,
    data?: Record<string, JSONValue>,
    config?: PatchConfig
  ) {
    return this.instance.request<R>({ ...config, url, data, method: 'patch' })
  }
  // destory
  delete<R = unknown>(
    url: string,
    query?: Record<string, string>,
    config?: DeleteConfig
  ) {
    return this.instance.request<R>({
      ...config,
      url,
      params: query,
      method: 'delete',
    })
  }
}

const mockList: Record<string, Mock> = {
  tagIndex: mockTagIndex,
  itemCreate: mockItemCreate,
  tagShow: mockTagShow,
  tagEdit: mockTagEdit,
  itemIndex: mockItemIndex,
  session: mockSession,
  itemIndexBalance: mockItemIndexBalance,
  itemSummary: mockItemSummary
}

const mock = (response: AxiosResponse) => {
  if (
    ['localhost', '127.0.0.1', '192.168.3.57'].indexOf(location.hostname) === -1
  ) {
    return false
  }

  const mockName = response.config?.params?._mock
  if (Object.keys(mockList).includes(mockName)) {
    ;[response.status, response.data] = mockList[mockName](response.config)
    return true
  }
  return false
}

export const http = new Http('/api/v1')

http.instance.interceptors.request.use((config) => {
  const jwt = localStorage.getItem('jwt')
  if (jwt) {
    config.headers!.Authorization = `Bearer ${jwt}`
  }
  return config
})

http.instance.interceptors.response.use(
  (response) => {
    mock(response)
    if (response.status >= 400) {
      throw { response }
    } else {
      return response
    }
  },
  (error) => {
    mock(error.response)
    if (error.response.status >= 400) {
      throw error
    } else {
      return error.response
    }
  }
)

http.instance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response) {
      const axiosError = error as AxiosError
      if (axiosError.response?.status === 429) {
        alert('你太频繁了')
      }
    }
    throw error
  }
)

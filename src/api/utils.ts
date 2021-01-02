import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios'
import Cookies from 'js-cookie'

interface RequestParams {
  url: string
  method: Method
  data?: any
}

const request = async ({ url, method, data }: RequestParams) => {
  const requestConfig: AxiosRequestConfig = {
    baseURL: 'http://dev.localhost:5000',
    url,
    method,
    data,
    withCredentials: true,
    headers: {
      'X-COHOST-CSRF-ACCESS-TOKEN': Cookies.get('cohost_csrf_access_token') || '',
      'X-COHOST-CSRF-REFRESH-TOKEN': Cookies.get('cohost_csrf_refresh_token') || '',
    },
  }

  let response: AxiosResponse
  try {
    response = await axios(requestConfig)
  } catch (e) {
    console.error(`API Error ${e.response.status}: ${e}`)
    e.message = e.response?.data?.message || e.message
    throw e
  }

  return response
}

export const get = async (url: string) => {
  return request({ url, method: 'get' })
}

export const post = async (url: string, data?: any) => {
  return request({ url, method: 'post', data })
}

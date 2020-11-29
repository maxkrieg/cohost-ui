import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios'

interface RequestParams {
  url: string
  method: Method
  data?: any
}

const request = async ({ url, method, data }: RequestParams) => {
  const config: AxiosRequestConfig = {
    baseURL: 'http://localhost:5000/api',
    url,
    method,
    data,
    headers: {},
  }
  const token = localStorage.getItem('token')
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    }
  }

  let response: AxiosResponse
  try {
    response = await axios(config)
  } catch (e) {
    console.error(
      `API Error on '${config.method?.toUpperCase()}' to '${config.url}': ${
        e.response.data.message
      }. Errors: ${JSON.stringify(e.response.data.errors)}`,
    )
    throw e
  }

  return response
}

export const get = async (url: string) => {
  return request({ url, method: 'get' })
}

export const post = async (url: string, data: any) => {
  return request({ url, method: 'post', data })
}

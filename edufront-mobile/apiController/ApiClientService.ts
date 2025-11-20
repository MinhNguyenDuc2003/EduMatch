// eslint-disable-next-line import/no-unresolved
import {NEXT_PUBLIC_API_TOKEN , NEXT_PUBLIC_API_BASE_PATH} from '@env'
interface RequestOptions {
  method: string;
  headers: {
    [key: string]: string;
  };
  body?: string;
}

const baseUrl = NEXT_PUBLIC_API_BASE_PATH || '';
const token = NEXT_PUBLIC_API_TOKEN || '' ;




console.log(baseUrl)
console.log(token)
const sendRequest = async (
  method: string,
  endpoint: string,
  data: any = null,
  contentType: string | null = null
) => {
  const defaultContentType = 'application/json; charset=UTF-8';
  const requestOptions: RequestOptions = {
    method: method.toUpperCase(),
    headers: {
      'Content-type': contentType ?? defaultContentType,
      Authorization: `Bearer ${token}`,
    },
  };

  if (data) {
    if (data instanceof FormData) {
      delete requestOptions.headers['Content-type'];
      requestOptions.body = data as any;
    } else {
      requestOptions.body = JSON.stringify(data);
    }
  }

  const url = endpoint.startsWith('http') ? endpoint : `${baseUrl}${endpoint}`;

  try {
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      // Nếu server trả lỗi
      const errorText = await response.text();
      throw new Error(errorText || response.statusText);
    }

    // Nếu response là JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      return await response.text();
    }
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};


const apiClientService = {
  get: (endpoint: string) => sendRequest('GET', endpoint),
  post: (endpoint: string, data: any, contentType: string | null = null) =>
    sendRequest('POST', endpoint, data, contentType),
  put: (endpoint: string, data: any, contentType: string | null = null) =>
    sendRequest('PUT', endpoint, data, contentType),
  delete: (endpoint: string) => sendRequest('DELETE', endpoint),
};

export default apiClientService;

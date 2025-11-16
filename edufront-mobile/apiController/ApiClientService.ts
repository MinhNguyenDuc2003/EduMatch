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
// const baseUrl = 'http://159.89.200.244';
const token = NEXT_PUBLIC_API_TOKEN || '';
// const token = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJkd3RQV2xmMmhNRVFYV0VUS3o2RW9CRHc5QUNhb0hOdXI1U3pRM3NIS2g4In0.eyJleHAiOjE3NjMzMzc3MDMsImlhdCI6MTc2MzMwMTcwMywiYXV0aF90aW1lIjoxNzYzMzAxNzAzLCJqdGkiOiJhMjgwMzc4ZS05YmY5LTRhM2QtODBiOS01NWEzYjFjNDkwYjkiLCJpc3MiOiJodHRwczovL2FwaS5lZHVtYXRjaC5zcGFjZS9pZGVudGl0eS9yZWFsbXMvWWFzIiwic3ViIjoiNTdkYjZiMmItYzljMy00MmE3LWJhNTUtOTJjODU2NDJmMmNiIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoic3dhZ2dlci11aSIsInNpZCI6IjI5MmJkNTJhLTk2N2MtNDhjYi1hNDdkLTFhNzdjZjk1OGI5YSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vYXBpLnlhcy5sb2NhbCIsImh0dHA6Ly8xNTkuODkuMjAwLjI0NC8qIiwiaHR0cDovL2xvY2FsaG9zdDo4MDg4IiwiaHR0cDovL2xvY2FsaG9zdDo4MDg5IiwiaHR0cDovL2xvY2FsaG9zdDo4MDg0IiwiaHR0cDovL2xvY2FsaG9zdDo4MDgzIiwiaHR0cDovL2xvY2FsaG9zdDo4MDg2IiwiaHR0cDovL2xvY2FsaG9zdDo4MDg1IiwiaHR0cDovL2xvY2FsaG9zdDo4MDgwIiwiaHR0cDovL2xvY2FsaG9zdDo4MDkxIiwiaHR0cDovL2xvY2FsaG9zdDo4MDkwIiwiaHR0cDovL2xvY2FsaG9zdDo4MDkzIiwiaHR0cDovL2xvY2FsaG9zdDo4MDgxIiwiaHR0cDovL2xvY2FsaG9zdDo4MDkyIiwiaHR0cDovLzE2MC4zMC4xMTMuMjI0LyoiLCJodHRwOi8vMTM5LjU5LjI1MS4xODEvKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy15YXMiLCJBUFBMSUNBTlQiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJEbyBNaW5oIEhpZXUiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJkZXZlbG9wZXI5IiwiZ2l2ZW5fbmFtZSI6IkRvIE1pbmgiLCJmYW1pbHlfbmFtZSI6IkhpZXUiLCJlbWFpbCI6ImhpZXVkbXNlMTdmZmYzNDE5QGdtYWlsLmNvbSJ9.nWMnEJ5RMKSMNxx-jZYc1WD2Qnt3PyZTrXLeu50IOcJrA9Ufdg4o9LtIsc75tu58cNXIwi5rY1eW680ztK1Ow2aakyT2ACN6tYMpTvlQyfaBr-56MWyGUZF-vf8ps_dQZnDrRy3nynLeyWtN26NGWlVKJ80ZNURRHWC7ckwCpCbdymq17Usd-_hd78Wsu2jNVaFgaaZnROACtQXDPEJMAzRjOu0qp7uZd57gQ0eFs_WVCPclD772RHtaAFXg8Yo5MKtmKcfNbMXzhplSVpjFDkxmFBylPpAmqXZHTUbS_ly7bdxgy6f08vPK3n5E4LNTB9isSWlLaga8EiQejG12kA';

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
    }
    requestOptions.body = JSON.stringify(data);
  }

  const url = endpoint.startsWith('http') ? endpoint : `${baseUrl}${endpoint}`;

  try {
    // const response = await fetch(url, method === 'GET' ? undefined : requestOptions);
    const response = await fetch(url, requestOptions);

    // Workaround to manually redirect in case of CORS error
    if (response.type == 'cors' && response.redirected) {
      window.location.href = response.url;
    }

    return await response.json();
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

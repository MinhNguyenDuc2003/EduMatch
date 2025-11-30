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
// const token = NEXT_PUBLIC_API_TOKEN || '' ;
const token = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJCenpBMlFrWmJlTEFGSTloTFFTMjNXQ1FiZHh5aVZHUmFyNmpuNGZGTS13In0.eyJleHAiOjE3NjM4OTIyNzYsImlhdCI6MTc2Mzg3NDI3NiwiYXV0aF90aW1lIjoxNzYzODcyNjYzLCJqdGkiOiJlMTZhYmQxMy1lYzc5LTQzN2ItYWUwZi02MzgzNTFjZGFjYzgiLCJpc3MiOiJodHRwczovL2FwaS5lZHVtYXRjaC5zcGFjZS9pZGVudGl0eS9yZWFsbXMvWWFzIiwic3ViIjoiMzJkZmU0NTgtZTI5OS00YzFjLTlmMmQtYTdiZTQ3MzM1NGZkIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoic3dhZ2dlci11aSIsInNpZCI6IjY5MzFhNjVhLWZmYmMtNDgyMi1hMTA3LWRiMmJlYjBlZjZhZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vYXBpLnlhcy5sb2NhbCIsImh0dHA6Ly8xNTkuODkuMjAwLjI0NC8qIiwiaHR0cDovL2xvY2FsaG9zdDo4MDg4IiwiaHR0cDovL2xvY2FsaG9zdDo4MDg5IiwiaHR0cDovL2xvY2FsaG9zdDo4MDg0IiwiaHR0cDovL2xvY2FsaG9zdDo4MDgzIiwiaHR0cDovL2xvY2FsaG9zdDo4MDg2IiwiaHR0cDovL2xvY2FsaG9zdDo4MDg1IiwiaHR0cDovL2xvY2FsaG9zdDo4MDgwIiwiaHR0cDovL2xvY2FsaG9zdDo4MDkxIiwiaHR0cDovL2xvY2FsaG9zdDo4MDkwIiwiaHR0cDovL2xvY2FsaG9zdDo4MDkzIiwiaHR0cDovL2xvY2FsaG9zdDo4MDgxIiwiaHR0cDovL2xvY2FsaG9zdDo4MDkyIiwiaHR0cDovLzE2MC4zMC4xMTMuMjI0LyoiLCJodHRwOi8vMTM5LjU5LjI1MS4xODEvKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy15YXMiLCJBUFBMSUNBTlQiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJNaW5oICBIaWV1IiwicHJlZmVycmVkX3VzZXJuYW1lIjoidGVzdDEyMyIsImdpdmVuX25hbWUiOiJNaW5oICIsImZhbWlseV9uYW1lIjoiSGlldSIsImVtYWlsIjoiaGlldWRlcHRyYWl2b2RpY2hAZ21haWwuY29tIn0.MnA6qy13-jnh6gOlU3l9CioXhJ7r6YnMaLy0GucDT6Yq7UTo2NmhPX77MsjR2DFQu_-Dix7M_CFrsUijKKD0YR0iOe1vG8Q2SHYf7eZcTwyguB4Po41ffkeG-MtoPhTUFmceZXfp--FGkSmHIxXCtVp2FzIFCwNLi5TCiJru_GhTb9j1n9wnW_Bo9NDLdTOLGUExYFlxizT9b0Pa1clWm1DNZ-Aa1IJqm0IVODliiHVnE8pS0Evz2-WoFconeu9iQMh7xoWEcW610bv02XQNQ5yYDUt5gl0aFuwSjJjAOZ0rc0qTkbIhzCldGKqCnhrOYcxXhJIs8algCZZcTlnQ0A' ;



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

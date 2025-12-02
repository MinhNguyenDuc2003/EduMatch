// eslint-disable-next-line import/no-unresolved
interface RequestOptions {
  method: string;
  headers: {
    [key: string]: string;
  };
  body?: string;
}

const baseUrl = "https://fpt.edumatch.space";
// const token = NEXT_PUBLIC_API_TOKEN || '' ;
const token =
  "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJCenpBMlFrWmJlTEFGSTloTFFTMjNXQ1FiZHh5aVZHUmFyNmpuNGZGTS13In0.eyJleHAiOjE3NjQ2OTg5NDEsImlhdCI6MTc2NDY4MDk0MSwiYXV0aF90aW1lIjoxNzY0NjgwOTQxLCJqdGkiOiIzZTFiODgyOS1jMjM1LTRmNGMtOGU0Yi00NTg5ZDQzZjY0MGEiLCJpc3MiOiJodHRwczovL2FwaS5lZHVtYXRjaC5zcGFjZS9pZGVudGl0eS9yZWFsbXMvWWFzIiwic3ViIjoiMGJjYzk2YjctMjcwYy00YWMzLTg2MWMtMWE1MjZhMTUzMmY2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoic3dhZ2dlci11aSIsInNpZCI6IjA1N2Y4ZDhjLTk0YmQtNGE0My1iZTBlLTk2YjJmYzQ0MmI2YiIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vYXBpLnlhcy5sb2NhbCIsImh0dHA6Ly8xNTkuODkuMjAwLjI0NC8qIiwiaHR0cDovL2xvY2FsaG9zdDo4MDg4IiwiaHR0cDovL2xvY2FsaG9zdDo4MDg5IiwiaHR0cDovL2xvY2FsaG9zdDo4MDg0IiwiaHR0cDovL2xvY2FsaG9zdDo4MDgzIiwiaHR0cDovL2xvY2FsaG9zdDo4MDg2IiwiaHR0cDovL2xvY2FsaG9zdDo4MDg1IiwiaHR0cDovL2xvY2FsaG9zdDo4MDgwIiwiaHR0cDovL2xvY2FsaG9zdDo4MDkxIiwiaHR0cDovL2xvY2FsaG9zdDo4MDkwIiwiaHR0cDovL2xvY2FsaG9zdDo4MDkzIiwiaHR0cDovL2xvY2FsaG9zdDo4MDgxIiwiaHR0cDovL2xvY2FsaG9zdDo4MDkyIiwiaHR0cDovLzE2MC4zMC4xMTMuMjI0LyoiLCJodHRwOi8vMTM5LjU5LjI1MS4xODEvKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy15YXMiLCJBUFBMSUNBTlQiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJDaGFybGVTcyBOZ3V5ZW4iLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJxdWFuIiwiZ2l2ZW5fbmFtZSI6IkNoYXJsZVNzIiwiZmFtaWx5X25hbWUiOiJOZ3V5ZW4iLCJlbWFpbCI6InF1YW5zaWV1cXVheTIwMTNAZ21haWwuY29tIn0.DOwxGq3E0QhVCG5gwonZL2q_AXSWGwqujulXSTQhFgavMW_sVUZ3-33s6pLfo9NC8ByJSvDXxu62NBrMosmCAY8gr5E_wZM3KhaGW8E34rKnZuMj7d55zk0g1Spf-CeFlEhRiWzXAWgm0CM0F05H0MaszQG3TJyBnoJRtieFNNuNhfSHxVoTffsPz2zMz1oZocasLvTQDOJ5kE4H3Zboj8hQIexvu5vtwNqIWA0AWRhXxjvA7imxcNt4nbbmUH1XmkZg4rV98SQFoyzblVYByVoeVDFU3UBp1c4nOZiBrKl1UObZXg0nOob8IinqAgvZRWzMWb8YcndRW2B5zZQ5eQ";

const sendRequest = async (
  method: string,
  endpoint: string,
  data: any = null,
  contentType: string | null = null
) => {
  const defaultContentType = "application/json; charset=UTF-8";
  const requestOptions: RequestOptions = {
    method: method.toUpperCase(),
    headers: {
      "Content-type": contentType ?? defaultContentType,
      Authorization: `Bearer ${token}`,
    },
  };
  if (data) {
    if (data instanceof FormData) {
      delete requestOptions.headers["Content-type"];
      requestOptions.body = data as any;
    } else {
      requestOptions.body = JSON.stringify(data);
    }
  }
  const url = endpoint.startsWith("http") ? endpoint : `${baseUrl}${endpoint}`;
  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      // Nếu server trả lỗi
      const errorText = await response.text();
      throw new Error(errorText || response.statusText);
    }
    // Nếu response là JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      return await response.text();
    }
  } catch (error) {
    console.log("API call error:", error);
    throw error;
  }
};

const apiClientService = {
  get: (endpoint: string) => sendRequest("GET", endpoint),
  post: (endpoint: string, data: any, contentType: string | null = null) =>
    sendRequest("POST", endpoint, data, contentType),
  put: (endpoint: string, data: any, contentType: string | null = null) =>
    sendRequest("PUT", endpoint, data, contentType),
  delete: (endpoint: string) => sendRequest("DELETE", endpoint),
};

export default apiClientService;

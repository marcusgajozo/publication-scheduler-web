import { clientHttp } from "@/lib/client-http";

export function get<T>(endpoint: string, headers?: HeadersInit) {
  return clientHttp<T>(endpoint, { method: "GET", headers });
}

export function post<T>(
  endpoint: string,
  body: unknown,
  headers?: HeadersInit
) {
  return clientHttp<T>(endpoint, {
    method: "POST",
    body: JSON.stringify(body),
    headers,
  });
}

export function put<T>(endpoint: string, body: unknown, headers?: HeadersInit) {
  return clientHttp<T>(endpoint, {
    method: "PUT",
    body: JSON.stringify(body),
    headers,
  });
}

export function del<T>(endpoint: string, headers?: HeadersInit) {
  return clientHttp<T>(endpoint, { method: "DELETE", headers });
}

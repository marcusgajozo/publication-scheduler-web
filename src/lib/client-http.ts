import { PUBLICATION_SCHEDULER_API_URL } from "@/constants/env";

export async function clientHttp<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = 'dasdasdas'

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    (headers as any)["Authorization"] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  const url = endpoint.startsWith("/")
    ? `${PUBLICATION_SCHEDULER_API_URL}${endpoint}`
    : `${PUBLICATION_SCHEDULER_API_URL}/${endpoint}`;

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorBody = await response.json();
        errorMessage = errorBody.message || JSON.stringify(errorBody);
      } catch {
        const errorText = await response.text();
        if (errorText) errorMessage = errorText;
      }

      throw new Error(errorMessage);
    }

    if (response.status === 204) {
      return {} as T;
    }

    return response.json() as Promise<T>;
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}

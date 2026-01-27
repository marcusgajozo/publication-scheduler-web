import { PUBLICATION_SCHEDULER_API_URL } from "@/constants/env";

type ReturnClientHttp<T> = {
  data: T;
  status: number;
};

export async function clientHttp<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ReturnClientHttp<T>> {
  const { auth } = await import("@/lib/auth");
  const session = await auth();
  const accessToken = session?.user?.access_token;

  const headers = new Headers(options.headers);

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  const url = PUBLICATION_SCHEDULER_API_URL?.concat(endpoint) as string;

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

    return {
      data: (await response.json()) as T,
      status: response.status,
    };
  } catch (error) {
    throw error;
  }
}

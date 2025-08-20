// apps/user-app/lib/fetchClient.ts

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

interface FetchOptions extends RequestInit {
  body?: any;
}

export async function apiFetch(path: string, options: FetchOptions = {}) {
  const { body, ...rest } = options;

  const res = await fetch(`${BASE_URL}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(rest.headers || {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include", // if using cookies/session
  });

  if (!res.ok) {
    throw new Error(`API request failed with status ${res.status}`);
  }

  return res.json();
}

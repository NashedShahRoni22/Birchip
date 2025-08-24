const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getApi(endPoint) {
  const res = await fetch(`${API_BASE_URL}${endPoint}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch data`);
  }

  return res.json();
}

export async function postApi(endPoint, data) {
  const res = await fetch(`${API_BASE_URL}${endPoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!result.status || !result.status) {
    throw new Error(result.message || "API returned error");
  }

  return result;
}

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

export const newGetApi = async (endPoint, token) => {
  const headers = {
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const res = await fetch(API_BASE_URL + endPoint, {
    headers,
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch data`);
  }

  const data = await res.json();

  return data;
};

export const newPostApi = async (endPoint, payload, token) => {
  const isFormData = payload instanceof FormData;

  const headers = {
    ...(!isFormData && { "Content-Type": "application/json" }),
    ...(token && { Authorization: `Bearer ${token}` }),
  };
  const body = isFormData ? payload : JSON.stringify(payload);

  const res = await fetch(API_BASE_URL + endPoint, {
    method: "POST",
    headers,
    body,
  });
  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message || "Post Request failed");
    error.response = data;
    throw error;
  }

  return data;
};

export const putApi = async (endPoint, payload, token) => {
  const isFormData = payload instanceof FormData;

  const headers = {
    ...(!isFormData && { "Content-Type": "application/json" }),
    ...(token && { Authorization: `Bearer ${token}` }),
  };
  const body = isFormData ? payload : JSON.stringify(payload);

  const res = await fetch(API_BASE_URL + endPoint, {
    method: "PUT",
    headers,
    body,
  });
  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message || "Put Request failed");
    error.response = data;
    throw error;
  }

  return data;
};

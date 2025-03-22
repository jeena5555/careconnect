const API_BASE_URL = "http://localhost:5001/api"; // เปลี่ยนเป็น URL ของ Backend จริง

export const apiClient = async (endpoint: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    console.log(response);

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
};

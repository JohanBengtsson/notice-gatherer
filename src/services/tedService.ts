
import { TedResponse } from "../types/tender";

export const fetchTedNotices = async (page = 1, limit = 5): Promise<TedResponse> => {
  try {
    // Call our Supabase Edge Function
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_FUNCTIONS_URL}/ted-proxy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({ page, limit }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching TED notices:", error);
    throw error;
  }
};

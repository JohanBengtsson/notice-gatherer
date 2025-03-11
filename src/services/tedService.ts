
import { TedResponse } from "../types/tender";

export const fetchTedNotices = async (page = 1, limit = 5): Promise<TedResponse> => {
  try {
    console.log("Calling Supabase Edge Function with URL:", `${import.meta.env.VITE_SUPABASE_FUNCTIONS_URL}/ted-proxy`);
    console.log("Using auth token:", import.meta.env.VITE_SUPABASE_ANON_KEY ? "Available" : "Not available");
    
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
      console.error(`API request failed with status ${response.status}:`, await response.text());
      throw new Error(`API request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching TED notices:", error);
    
    // As a fallback, try to import the mock data directly
    try {
      const { proxyTedNotices } = await import("../api/tedApi");
      console.log("Using fallback mock data");
      return await proxyTedNotices(page, limit);
    } catch (fallbackError) {
      console.error("Even fallback failed:", fallbackError);
      throw error; // Throw the original error
    }
  }
};

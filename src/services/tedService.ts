
import { TedResponse } from "../types/tender";

export const fetchTedNotices = async (page = 1, limit = 5): Promise<TedResponse> => {
  try {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseFunctionUrl = `${supabaseUrl}/functions/v1/ted-proxy`;
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    console.log("Calling Supabase Edge Function with URL:", supabaseFunctionUrl);
    console.log("Using auth token:", anonKey ? "Available" : "Not available");
    
    // Call our Supabase Edge Function
    const response = await fetch(supabaseFunctionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${anonKey}`
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

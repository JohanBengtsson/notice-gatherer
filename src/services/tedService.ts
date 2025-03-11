
import { TedResponse } from "../types/tender";
import { proxyTedNotices } from "../api/tedApi";

export const fetchTedNotices = async (page = 1, limit = 5): Promise<TedResponse> => {
  try {
    // Use our proxy function instead of direct fetch to TED API
    return await proxyTedNotices(page, limit);
    
    /* 
    In a real production environment with a proper backend, you would do something like:
    
    const response = await fetch("/api/ted-notices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ page, limit }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return await response.json();
    */
  } catch (error) {
    console.error("Error fetching TED notices:", error);
    throw error;
  }
};

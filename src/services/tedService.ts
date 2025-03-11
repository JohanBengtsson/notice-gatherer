
import { TedResponse } from "../types/tender";
import { supabase } from "@/integrations/supabase/client";

export const fetchTedNotices = async (page = 1, limit = 5): Promise<TedResponse> => {
  try {
    console.log("Invoking TED proxy Edge Function");
    
    const { data, error } = await supabase.functions.invoke('ted-proxy', {
      body: { page, limit }
    });

    if (error) {
      console.error("Edge function error:", error);
      throw error;
    }

    return data;
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

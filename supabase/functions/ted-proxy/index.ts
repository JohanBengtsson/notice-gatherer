
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  console.log("Ted-proxy Edge Function received request:", req.method);
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
      status: 204,
    });
  }

  try {
    // Parse the request body
    let body;
    try {
      body = await req.json();
      console.log("Request body:", body);
    } catch (e) {
      console.error("Error parsing request body:", e);
      body = { page: 1, limit: 5 };
    }
    
    const { page = 1, limit = 5 } = body;
    
    // Construct the request to the TED API
    const tedApiUrl = "https://api.ted.europa.eu/v3/notices/search";
    console.log(`Calling TED API: ${tedApiUrl}?page=${page}&pageSize=${limit}`);
    
    // For demo purposes, we're using a simple request
    // This can be expanded with more sophisticated parameters as needed
    const tedResponse = await fetch(`${tedApiUrl}?page=${page}&pageSize=${limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Add any required TED API authentication headers here if needed
      },
    });

    console.log(`TED API response status: ${tedResponse.status}`);

    if (!tedResponse.ok) {
      console.error(`TED API request failed with status ${tedResponse.status}`);
      throw new Error(`TED API request failed with status ${tedResponse.status}`);
    }

    // Get the TED API response
    const tedData = await tedResponse.json();
    console.log("TED API response received");
    
    // Transform the TED API response to match our expected format
    // Note: You'll need to adjust this mapping based on the actual TED API response structure
    const transformedData = {
      data: tedData.results?.map((item: any) => ({
        "publication-number": item.publicationNumber || "",
        "place-of-performance": {
          country: item.placeOfPerformance?.country || "",
          town: item.placeOfPerformance?.town || "",
          nuts: item.placeOfPerformance?.nuts || ""
        },
        "procedure-type": item.procedureType || "",
        "contract-nature": item.contractNature || "",
        "buyer-name": item.buyerName || "",
        "buyer-country": item.buyerCountry || "",
        "publication-date": item.publicationDate || "",
        "deadline-receipt-request": item.deadlineReceiptRequest || null,
        "notice-title": item.noticeTitle || "",
        "official-language": item.officialLanguage || "",
        "notice-type": item.noticeType || "",
        "BT-21-Procedure": item.bt21Procedure || "",
        "BT-24-Procedure": item.bt24Procedure || ""
      })) || [],
      pagination: {
        page: tedData.page || page,
        limit: tedData.pageSize || limit,
        total: tedData.total || 0
      }
    };

    // Return the transformed data with CORS headers
    return new Response(JSON.stringify(transformedData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error in TED API proxy:", error);
    
    // If the TED API is unavailable, return fallback mock data
    // Import using dynamic import to handle ESM modules in Deno
    try {
      const mockDataModule = await import("../../../src/api/tedApi.ts");
      console.log("Using fallback mock data");
      const mockData = await mockDataModule.proxyTedNotices(1, 5);
      
      return new Response(JSON.stringify(mockData), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    } catch (fallbackError) {
      console.error("Error loading fallback data:", fallbackError);
      
      // Provide a minimal fallback if everything else fails
      return new Response(JSON.stringify({
        data: [],
        pagination: { page: 1, limit: 5, total: 0 }
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }
  }
});

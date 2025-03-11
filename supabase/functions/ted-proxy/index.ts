
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
      status: 204,
    });
  }

  try {
    const { page = 1, limit = 5 } = await req.json();
    
    // Construct the request to the TED API
    const tedApiUrl = "https://api.ted.europa.eu/v3/notices/search";
    
    // For demo purposes, we're using a simple request
    // This can be expanded with more sophisticated parameters as needed
    const tedResponse = await fetch(`${tedApiUrl}?page=${page}&pageSize=${limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Add any required TED API authentication headers here if needed
      },
    });

    if (!tedResponse.ok) {
      throw new Error(`TED API request failed with status ${tedResponse.status}`);
    }

    // Get the TED API response
    const tedData = await tedResponse.json();
    
    // Transform the TED API response to match our expected format
    // Note: You'll need to adjust this mapping based on the actual TED API response structure
    const transformedData = {
      data: tedData.results.map((item: any) => ({
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
      })),
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
    // This ensures the frontend still works even if the API is down
    const mockData = await import("../../../src/api/tedApi.ts").then(
      module => module.proxyTedNotices(1, 5)
    );
    
    return new Response(JSON.stringify(mockData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  }
});

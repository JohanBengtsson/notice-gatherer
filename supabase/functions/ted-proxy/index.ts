
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
    console.log(`Calling TED API: ${tedApiUrl} with POST method, page=${page}&pageSize=${limit}`);
    
    // Change from GET to POST method
    const tedResponse = await fetch(tedApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any required TED API authentication headers here if needed
      },
      body: JSON.stringify({
        page: page,
        pageSize: limit
        // Add any other required parameters for the TED API here
      }),
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
    
    // Use fallback mock data
    const mockData = {
      data: [
        {
          "publication-number": "2025/S 123-456789",
          "place-of-performance": {
            "country": "Sweden",
            "town": "Stockholm",
            "nuts": "SE110"
          },
          "procedure-type": "Open procedure",
          "contract-nature": "Services",
          "buyer-name": "City of Stockholm",
          "buyer-country": "SWE",
          "publication-date": "2025-03-11",
          "deadline-receipt-request": "2025-04-15",
          "notice-title": "IT System Maintenance Services (Fallback)",
          "official-language": "SV",
          "notice-type": "Contract notice",
          "BT-21-Procedure": "OPEN",
          "BT-24-Procedure": "ELECTRONIC"
        },
        // Add more mock data here as needed
      ],
      pagination: {
        page: 1,
        limit: 5,
        total: 42
      }
    };
    
    return new Response(JSON.stringify(mockData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  }
});

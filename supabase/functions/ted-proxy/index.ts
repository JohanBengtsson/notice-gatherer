
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
    
    const { page = 1, limit = 5, query } = body;
    
    // Construct the request to the TED API
    const tedApiUrl = "https://api.ted.europa.eu/v3/notices/search";
    
    // Prepare the API request body based on the curl command
    const requestBody = {
      query: query || "buyer-country=SWE AND publication-date > 20250310 SORT BY publication-number DESC",
      page: page,
      limit: limit,
      fields: [
        "BT-21-Procedure",
        "BT-24-Procedure",
        "publication-number",
        "place-of-performance",
        "procedure-type",
        "contract-nature",
        "buyer-name",
        "buyer-country",
        "publication-date",
        "deadline-receipt-request",
        "notice-title",
        "official-language",
        "notice-type"
      ],
      scope: "ACTIVE",
      onlyLatestVersions: false
    };
    
    console.log(`Calling TED API: ${tedApiUrl} with POST method and query: ${requestBody.query}`);
    
    const tedResponse = await fetch(tedApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json, text/plain, */*",
        "referer": "https://ted.europa.eu/"
      },
      body: JSON.stringify(requestBody),
    });

    console.log(`TED API response status: ${tedResponse.status}`);

    if (!tedResponse.ok) {
      console.error(`TED API request failed with status ${tedResponse.status}`);
      throw new Error(`TED API request failed with status ${tedResponse.status}`);
    }

    // Get the TED API response
    const tedData = await tedResponse.json();
    console.log("TED API response received:", JSON.stringify(tedData).substring(0, 200) + "...");
    
    // Log the structure of the TED API response to help with debugging
    console.log("TED API response structure:", Object.keys(tedData));
    
    // Check if a sample notice is available for debugging
    if (tedData.notices && tedData.notices.length > 0) {
      console.log("Sample notice structure:", JSON.stringify(tedData.notices[0]).substring(0, 300) + "...");
    }
    
    const transformedData = {
      data: tedData.notices?.map((item: any) => {
        // Log each notice to understand the mapping better
        console.log(`Processing notice with publication number: ${item.publicationNumber || item['publication-number'] || 'unknown'}`);
        
        return {
          "publication-number": item.publicationNumber || item['publication-number'] || "",
          "place-of-performance": {
            country: item.placeOfPerformance?.country || 
                   (item['place-of-performance'] ? item['place-of-performance'].country : ""),
            town: item.placeOfPerformance?.town || 
                 (item['place-of-performance'] ? item['place-of-performance'].town : ""),
            nuts: item.placeOfPerformance?.nuts || 
                (item['place-of-performance'] ? item['place-of-performance'].nuts : "")
          },
          "procedure-type": item.procedureType || item['procedure-type'] || "",
          "contract-nature": item.contractNature || item['contract-nature'] || "",
          "buyer-name": item.buyerName || item['buyer-name'] || "",
          "buyer-country": item.buyerCountry || item['buyer-country'] || "",
          "publication-date": item.publicationDate || item['publication-date'] || "",
          "deadline-receipt-request": item.deadlineReceiptRequest || item['deadline-receipt-request'] || null,
          "notice-title": item.noticeTitle || item['notice-title'] || "",
          "official-language": item.officialLanguage || item['official-language'] || "",
          "notice-type": item.noticeType || item['notice-type'] || "",
          "BT-21-Procedure": item.bt21Procedure || item['BT-21-Procedure'] || "",
          "BT-24-Procedure": item.bt24Procedure || item['BT-24-Procedure'] || ""
        };
      }) || [],
      pagination: {
        page: tedData.metadata?.currentPage || tedData.page || page,
        limit: tedData.metadata?.itemsPerPage || tedData.pageSize || tedData.limit || limit,
        total: tedData.metadata?.totalItems || tedData.total || 0
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

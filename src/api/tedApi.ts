
import { TedResponse } from "../types/tender";

// This is now used only as a fallback in the Edge Function if the TED API is unavailable
export const proxyTedNotices = async (page = 1, limit = 5): Promise<TedResponse> => {
  // In a real production app, this would be a server endpoint, not browser-side code
  // For demo purposes, we're returning mock data with the same structure as the API
  
  // Sample mock data that matches the TedResponse type
  return {
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
        "notice-title": "IT System Maintenance Services",
        "official-language": "SV",
        "notice-type": "Contract notice",
        "BT-21-Procedure": "OPEN",
        "BT-24-Procedure": "ELECTRONIC"
      },
      {
        "publication-number": "2025/S 123-456788",
        "place-of-performance": {
          "country": "Sweden",
          "town": "Gothenburg",
          "nuts": "SE232"
        },
        "procedure-type": "Restricted procedure",
        "contract-nature": "Supplies",
        "buyer-name": "Gothenburg Municipality",
        "buyer-country": "SWE",
        "publication-date": "2025-03-10",
        "deadline-receipt-request": "2025-04-10",
        "notice-title": "Medical Equipment Procurement",
        "official-language": "SV",
        "notice-type": "Contract notice",
        "BT-21-Procedure": "RESTRICTED",
        "BT-24-Procedure": "ELECTRONIC"
      },
      {
        "publication-number": "2025/S 123-456787",
        "place-of-performance": {
          "country": "Sweden",
          "town": "Malmö",
          "nuts": "SE224"
        },
        "procedure-type": "Open procedure",
        "contract-nature": "Works",
        "buyer-name": "Malmö City Council",
        "buyer-country": "SWE",
        "publication-date": "2025-03-09",
        "deadline-receipt-request": "2025-04-20",
        "notice-title": "Public Transport Infrastructure Development",
        "official-language": "SV",
        "notice-type": "Contract notice",
        "BT-21-Procedure": "OPEN",
        "BT-24-Procedure": "ELECTRONIC"
      },
      {
        "publication-number": "2025/S 123-456786",
        "place-of-performance": {
          "country": "Sweden",
          "town": "Uppsala",
          "nuts": "SE121"
        },
        "procedure-type": "Competitive dialogue",
        "contract-nature": "Services",
        "buyer-name": "Uppsala County",
        "buyer-country": "SWE",
        "publication-date": "2025-03-08",
        "deadline-receipt-request": "2025-04-12",
        "notice-title": "Smart City Solutions Implementation",
        "official-language": "SV",
        "notice-type": "Contract notice",
        "BT-21-Procedure": "COMPETITIVE_DIALOGUE",
        "BT-24-Procedure": "ELECTRONIC"
      },
      {
        "publication-number": "2025/S 123-456785",
        "place-of-performance": {
          "country": "Sweden", 
          "town": "Umeå",
          "nuts": "SE331"
        },
        "procedure-type": "Open procedure",
        "contract-nature": "Services",
        "buyer-name": "Umeå University",
        "buyer-country": "SWE",
        "publication-date": "2025-03-07",
        "deadline-receipt-request": "2025-04-05",
        "notice-title": "Research Equipment and Laboratory Services",
        "official-language": "SV",
        "notice-type": "Contract notice",
        "BT-21-Procedure": "OPEN",
        "BT-24-Procedure": "ELECTRONIC"
      }
    ],
    pagination: {
      page: page,
      limit: limit,
      total: 42
    }
  };
};

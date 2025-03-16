
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
        "buyer-name": {
          "eng": ["City of Stockholm"]
        },
        "buyer-country": ["SWE"],
        "publication-date": "2025-03-11",
        "deadline-receipt-request": "2025-04-15",
        "notice-title": {
          "eng": "IT System Maintenance Services"
        },
        "official-language": ["SV"],
        "notice-type": "Contract notice",
        "BT-21-Procedure": {
          "eng": "OPEN"
        },
        "BT-24-Procedure": {
          "eng": "ELECTRONIC"
        }
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
        "buyer-name": {
          "eng": ["Gothenburg Municipality"]
        },
        "buyer-country": ["SWE"],
        "publication-date": "2025-03-10",
        "deadline-receipt-request": "2025-04-10",
        "notice-title": {
          "eng": "Medical Equipment Procurement"
        },
        "official-language": ["SV"],
        "notice-type": "Contract notice",
        "BT-21-Procedure": {
          "eng": "RESTRICTED"
        },
        "BT-24-Procedure": {
          "eng": "ELECTRONIC"
        }
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
        "buyer-name": {
          "eng": ["Malmö City Council"]
        },
        "buyer-country": ["SWE"],
        "publication-date": "2025-03-09",
        "deadline-receipt-request": "2025-04-20",
        "notice-title": {
          "eng": "Public Transport Infrastructure Development"
        },
        "official-language": ["SV"],
        "notice-type": "Contract notice",
        "BT-21-Procedure": {
          "eng": "OPEN"
        },
        "BT-24-Procedure": {
          "eng": "ELECTRONIC"
        }
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
        "buyer-name": {
          "eng": ["Uppsala County"]
        },
        "buyer-country": ["SWE"],
        "publication-date": "2025-03-08",
        "deadline-receipt-request": "2025-04-12",
        "notice-title": {
          "eng": "Smart City Solutions Implementation"
        },
        "official-language": ["SV"],
        "notice-type": "Contract notice",
        "BT-21-Procedure": {
          "eng": "COMPETITIVE_DIALOGUE"
        },
        "BT-24-Procedure": {
          "eng": "ELECTRONIC"
        }
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
        "buyer-name": {
          "eng": ["Umeå University"]
        },
        "buyer-country": ["SWE"],
        "publication-date": "2025-03-07",
        "deadline-receipt-request": "2025-04-05",
        "notice-title": {
          "eng": "Research Equipment and Laboratory Services"
        },
        "official-language": ["SV"],
        "notice-type": "Contract notice",
        "BT-21-Procedure": {
          "eng": "OPEN"
        },
        "BT-24-Procedure": {
          "eng": "ELECTRONIC"
        }
      }
    ],
    pagination: {
      page: page,
      limit: limit,
      total: 42
    }
  };
};

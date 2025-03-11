
import { TedResponse } from "../types/tender";

export const fetchTedNotices = async (page = 1, limit = 5): Promise<TedResponse> => {
  try {
    const response = await fetch("https://api.ted.europa.eu/v3/notices/search", {
      method: "POST",
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "Referer": "https://ted.europa.eu/"
      },
      body: JSON.stringify({
        query: "buyer-country=SWE AND publication-date > 20250310 SORT BY publication-number DESC",
        page,
        limit,
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
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching TED notices:", error);
    throw error;
  }
};

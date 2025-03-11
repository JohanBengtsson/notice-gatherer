
export interface TedResponse {
  data: TedNotice[];
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
}

export interface TedNotice {
  "publication-number": string;
  "place-of-performance"?: PlaceOfPerformance;
  "procedure-type"?: string;
  "contract-nature"?: string;
  "buyer-name"?: string;
  "buyer-country"?: string;
  "publication-date"?: string;
  "deadline-receipt-request"?: string | null;
  "notice-title"?: string;
  "official-language"?: string;
  "notice-type"?: string;
  "BT-21-Procedure"?: string;
  "BT-24-Procedure"?: string;
}

export interface PlaceOfPerformance {
  country?: string;
  town?: string;
  nuts?: string;
}

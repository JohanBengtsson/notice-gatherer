
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
  "procedure-type"?: string | string[];
  "contract-nature"?: string | string[];
  "buyer-name"?: {
    [languageCode: string]: string[];
  } | string;
  "buyer-country"?: string[] | string;
  "publication-date"?: string;
  "deadline-receipt-request"?: string | null;
  "notice-title"?: {
    [languageCode: string]: string;
  } | string;
  "official-language"?: string[] | string;
  "notice-type"?: string;
  "BT-21-Procedure"?: {
    [languageCode: string]: string;
  } | string;
  "BT-24-Procedure"?: {
    [languageCode: string]: string;
  } | string;
}

export interface PlaceOfPerformance {
  country?: string;
  town?: string;
  nuts?: string;
}

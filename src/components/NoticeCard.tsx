
import React from 'react';
import { TedNotice } from '../types/tender';
import { formatDate } from '../lib/utils';

interface NoticeCardProps {
  notice: TedNotice;
  index: number;
}

const NoticeCard: React.FC<NoticeCardProps> = ({ notice, index }) => {
  // Safely handle publication date
  const formattedPublicationDate = notice["publication-date"] 
    ? formatDate(notice["publication-date"]) 
    : "Not specified";
  
  // Safely handle deadline
  const formattedDeadline = notice["deadline-receipt-request"] 
    ? formatDate(notice["deadline-receipt-request"]) 
    : "Not specified";

  // Calculate animation delay based on index
  const animationDelay = `${index * 0.05}s`;

  // Extract place of performance safely
  const placeOfPerformance = notice["place-of-performance"] || { country: "", town: "", nuts: "" };
  const locationTown = placeOfPerformance.town || "Not specified";
  const locationCountry = placeOfPerformance.country || "Not specified";
  const locationNuts = placeOfPerformance.nuts;

  // Extract buyer name - prefer English, then Swedish, then first available language
  const extractBuyerName = () => {
    if (!notice["buyer-name"]) return "Not specified";
    
    const nameObj = notice["buyer-name"];
    if (nameObj.eng && nameObj.eng.length > 0) return nameObj.eng[0];
    if (nameObj.swe && nameObj.swe.length > 0) return nameObj.swe[0];
    
    // Get first available language
    const firstLang = Object.keys(nameObj)[0];
    return firstLang && nameObj[firstLang].length > 0 ? nameObj[firstLang][0] : "Not specified";
  };

  // Extract the title - prefer English, then Swedish, then first available language
  const extractTitle = () => {
    if (!notice["notice-title"]) return "Untitled Tender";
    
    const titleObj = notice["notice-title"];
    if (titleObj.eng) return titleObj.eng;
    if (titleObj.swe) return titleObj.swe;
    
    // Get first available language
    const firstLang = Object.keys(titleObj)[0];
    return firstLang ? titleObj[firstLang] : "Untitled Tender";
  };

  // Handle contract nature which can be string or array
  const getContractNature = () => {
    const nature = notice["contract-nature"];
    if (!nature) return "Unknown type";
    if (Array.isArray(nature)) return nature[0];
    return nature;
  };

  // Handle procedure type which can be string or array
  const getProcedureType = () => {
    const type = notice["procedure-type"];
    if (!type) return "Not specified";
    if (Array.isArray(type)) return type[0];
    return type;
  };

  // Extract buyer country
  const getBuyerCountry = () => {
    const country = notice["buyer-country"];
    if (!country || !Array.isArray(country) || country.length === 0) return "Not specified";
    return country[0];
  };

  return (
    <div 
      className="notice-card p-6 animate-fade-up"
      style={{ animationDelay }}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
            {notice["publication-number"] || "No ID"}
          </span>
          <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
            {getContractNature()}
          </span>
        </div>
        <span className="text-sm text-muted-foreground">
          Published: {formattedPublicationDate}
        </span>
      </div>
      
      <h3 className="text-lg font-medium leading-tight mb-2">
        {extractTitle()}
      </h3>
      
      <div className="text-sm text-muted-foreground mb-4">
        <div className="flex flex-wrap gap-y-1">
          <div className="w-full sm:w-1/2">
            <span className="font-medium text-foreground">Buyer:</span> {extractBuyerName()}
          </div>
          <div className="w-full sm:w-1/2">
            <span className="font-medium text-foreground">Country:</span> {getBuyerCountry()}
          </div>
          <div className="w-full sm:w-1/2">
            <span className="font-medium text-foreground">Procedure:</span> {getProcedureType()}
          </div>
          <div className="w-full sm:w-1/2">
            <span className="font-medium text-foreground">Deadline:</span> {formattedDeadline}
          </div>
        </div>
      </div>
      
      {placeOfPerformance && (locationTown || locationCountry) && (
        <div className="text-sm p-3 rounded bg-secondary/50">
          <span className="font-medium text-foreground">Location:</span> {locationTown}, {locationCountry}
          {locationNuts && (
            <span className="text-xs text-muted-foreground ml-1">({locationNuts})</span>
          )}
        </div>
      )}
    </div>
  );
};

export default NoticeCard;

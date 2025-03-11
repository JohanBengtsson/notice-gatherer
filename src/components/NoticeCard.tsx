
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
            {notice["contract-nature"] || "Unknown type"}
          </span>
        </div>
        <span className="text-sm text-muted-foreground">
          Published: {formattedPublicationDate}
        </span>
      </div>
      
      <h3 className="text-lg font-medium leading-tight mb-2">
        {notice["notice-title"] || "Untitled Tender"}
      </h3>
      
      <div className="text-sm text-muted-foreground mb-4">
        <div className="flex flex-wrap gap-y-1">
          <div className="w-full sm:w-1/2">
            <span className="font-medium text-foreground">Buyer:</span> {notice["buyer-name"] || "Not specified"}
          </div>
          <div className="w-full sm:w-1/2">
            <span className="font-medium text-foreground">Country:</span> {notice["buyer-country"] || "Not specified"}
          </div>
          <div className="w-full sm:w-1/2">
            <span className="font-medium text-foreground">Procedure:</span> {notice["procedure-type"] || "Not specified"}
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

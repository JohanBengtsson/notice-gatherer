
import React from 'react';
import { TedNotice } from '../types/tender';
import { formatDate } from '../lib/utils';

interface NoticeCardProps {
  notice: TedNotice;
  index: number;
}

const NoticeCard: React.FC<NoticeCardProps> = ({ notice, index }) => {
  const formattedPublicationDate = formatDate(notice["publication-date"]);
  const formattedDeadline = notice["deadline-receipt-request"] 
    ? formatDate(notice["deadline-receipt-request"]) 
    : "Not specified";

  // Calculate animation delay based on index
  const animationDelay = `${index * 0.05}s`;

  return (
    <div 
      className="notice-card p-6 animate-fade-up"
      style={{ animationDelay }}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
            {notice["publication-number"]}
          </span>
          <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
            {notice["contract-nature"]}
          </span>
        </div>
        <span className="text-sm text-muted-foreground">
          Published: {formattedPublicationDate}
        </span>
      </div>
      
      <h3 className="text-lg font-medium leading-tight mb-2">{notice["notice-title"]}</h3>
      
      <div className="text-sm text-muted-foreground mb-4">
        <div className="flex flex-wrap gap-y-1">
          <div className="w-full sm:w-1/2">
            <span className="font-medium text-foreground">Buyer:</span> {notice["buyer-name"]}
          </div>
          <div className="w-full sm:w-1/2">
            <span className="font-medium text-foreground">Country:</span> {notice["buyer-country"]}
          </div>
          <div className="w-full sm:w-1/2">
            <span className="font-medium text-foreground">Procedure:</span> {notice["procedure-type"]}
          </div>
          <div className="w-full sm:w-1/2">
            <span className="font-medium text-foreground">Deadline:</span> {formattedDeadline}
          </div>
        </div>
      </div>
      
      {notice["place-of-performance"] && (
        <div className="text-sm p-3 rounded bg-secondary/50">
          <span className="font-medium text-foreground">Location:</span> {notice["place-of-performance"].town}, {notice["place-of-performance"].country}
          {notice["place-of-performance"].nuts && (
            <span className="text-xs text-muted-foreground ml-1">({notice["place-of-performance"].nuts})</span>
          )}
        </div>
      )}
    </div>
  );
};

export default NoticeCard;

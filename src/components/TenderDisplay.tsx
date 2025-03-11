
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTedNotices } from '../services/tedService';
import NoticeCard from './NoticeCard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const TenderDisplay: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const { toast } = useToast();

  const { 
    data, 
    isLoading, 
    isError, 
    error,
    isPending,
    isPlaceholderData,
    refetch
  } = useQuery({
    queryKey: ['tedNotices', page, limit],
    queryFn: () => fetchTedNotices(page, limit),
    placeholderData: (previousData) => previousData,
    retry: 1,
  });

  useEffect(() => {
    if (isError) {
      toast({
        title: "Error fetching notices",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    }
  }, [isError, error, toast]);

  const handlePrevPage = () => {
    setPage(old => Math.max(old - 1, 1));
  };

  const handleNextPage = () => {
    if (data && data.pagination && !isPlaceholderData && page < Math.ceil(data.pagination.total / limit)) {
      setPage(old => old + 1);
    }
  };

  // Determine if we can go to next/prev pages
  const canGoBack = page > 1;
  const canGoNext = data?.pagination && page < Math.ceil(data.pagination.total / limit);

  if (isLoading) {
    return (
      <div className="py-10 space-y-4">
        {[...Array(3)].map((_, index) => (
          <div 
            key={index}
            className="h-48 rounded-lg bg-muted/30 animate-pulse-light"
            style={{ animationDelay: `${index * 0.1}s` }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="py-6">
      {data?.data && data.data.length > 0 ? (
        <>
          <div className="mb-4 flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Showing {data.data.length} of {data.pagination.total} notices
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              className="text-xs h-8"
            >
              Refresh
            </Button>
          </div>

          <div className="space-y-4">
            {data.data.map((notice, index) => (
              <NoticeCard key={notice["publication-number"]} notice={notice} index={index} />
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevPage}
              disabled={!canGoBack || isPending}
            >
              Previous
            </Button>
            <span className="text-sm">
              Page {page} of {data.pagination ? Math.ceil(data.pagination.total / limit) : '?'}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={!canGoNext || isPending}
            >
              Next
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No notices found</p>
        </div>
      )}
    </div>
  );
};

export default TenderDisplay;

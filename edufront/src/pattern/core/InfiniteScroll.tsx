import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { Button } from '@/pattern/cus/button';
import { useEffect } from 'react';

interface InfiniteScrollProps {
  isManual?: boolean;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage: () => void;
}

export const InfiniteScroll = ({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isManual = false,
}: InfiniteScrollProps) => {
  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.5,
    rootMargin: '100px',
  });

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage && !isManual) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage, isManual]);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="h-1" ref={targetRef} />
      {hasNextPage ? (
        <Button
          variant="ghost"
          disabled={!hasNextPage || isFetchingNextPage}
          onClick={() => fetchNextPage()}
        >
          {isFetchingNextPage ? 'Loading...' : 'Load More'}
        </Button>
      ) : (
        <p className="text-xs text-muted-foreground">You have reached the end of the list</p>
      )}
    </div>
  );
};

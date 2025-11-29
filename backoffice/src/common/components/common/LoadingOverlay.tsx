'use client';

import { useEffect, useState } from 'react';
import { eventBus } from 'src/utils/eventBus';

export default function LoadingOverlay() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handler = (status: boolean) => {
      setLoading(status);
    };

    eventBus.on("Loading", handler);

    return () => {
      eventBus.off("Loading", handler);
    };
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">
      <div className="animate-spin w-12 h-12 border-4 border-white border-t-transparent rounded-full" />
    </div>
  );
}

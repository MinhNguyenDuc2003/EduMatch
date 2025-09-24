"use client";
import { Box, Core, RText } from "@/lib/by/Div";
import { eventBus } from "@/utils/eventBus";
import { delay } from "lodash";
import { useEffect, useState } from "react";

const root = "Loading";

export function Loading() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handler = (data: any) => setLoading(data);
    eventBus.on(root, handler);

    return () => {
      eventBus.off(root, handler);
    };
  }, []);

  useEffect(() => {
    if (loading) {
      delay(() => setLoading(false), 5000);
    }
  }, [loading]);

  if (!loading) return null;

  return (
    <Core
      id="Loading"
      className="
        absolute inset-0 z-[999] flex flex-1 
        items-center justify-center 
        bg-white opacity-80
      "
    >
      <Box>
        <RText>Tiến trình đang hoạt động...</RText>
      </Box>
    </Core>
  );
}

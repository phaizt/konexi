"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  initialLocation?: string;
  initialType?: string;
};

export default function JobFilters({ initialLocation = "", initialType = "" }: Props) {
  const [location, setLocation] = useState(initialLocation);
  const [type, setType] = useState(initialType);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Keep inputs in sync if user navigates with back/forward
  useEffect(() => {
    setLocation(searchParams.get("location") ?? "");
    setType(searchParams.get("type") ?? "");
  }, [searchParams]);

  function updateURL(nextLocation: string, nextType: string) {
    const params = new URLSearchParams(searchParams.toString());
    nextLocation ? params.set("location", nextLocation) : params.delete("location");
    nextType ? params.set("type", nextType) : params.delete("type");
    router.replace(`/jobs/list?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="mb-6 flex flex-col md:flex-row gap-4">
      <input
        type="text"
        placeholder="Filter by location..."
        value={location}
        onChange={(e) => {
          const v = e.target.value;
          setLocation(v);
          updateURL(v, type);
        }}
        className="border rounded-lg px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        value={type}
        onChange={(e) => {
          const v = e.target.value;
          setType(v);
          updateURL(location, v);
        }}
        className="border rounded-lg px-3 py-2 flex-1 md:max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Job Types</option>
        <option value="Full-Time">Full-Time</option>
        <option value="Part-Time">Part-Time</option>
        <option value="Contract">Contract</option>
      </select>
    </div>
  );
}

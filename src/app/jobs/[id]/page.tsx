"use client";

import { checkAuth } from "@/lib/auth/checkAuth";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function JobDetailsPage() {
  const { id } = useParams();
  const supabase = createClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [job, setJob] = useState<any>(null);
  const [, setUserId] = useState("");

  useEffect(() => {
    (async () => {
      const user = await checkAuth();
      setUserId(user);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("id", id)
        .single(); // filter by user_id column

      console.log(data);

      if (error) console.error(error);
      else setJob(data);
    })();
  }, [supabase, id]);

  if (!job) {
    return (
      <main className="max-w-2xl mx-auto mt-10 p-6">
        <p className="text-red-600 font-medium">Job not found.</p>
        <Link
          href="/"
          className="text-blue-600 underline mt-4 inline-block"
        >
          Back to listings
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
      <p className="text-gray-600 mb-4">
        {job.company} — {job.location}
      </p>
      <span className="inline-block mb-6 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
        {job.type}
      </span>
      <p className="text-gray-700 whitespace-pre-line">{job.description}</p>

      <div className="mt-6">
        <Link
          href="/"
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Back to Listings
        </Link>
      </div>
    </main>
  );
}

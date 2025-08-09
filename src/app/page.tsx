"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { checkAuth } from "@/lib/auth/checkAuth";
import { redirect } from "next/navigation";

type SearchParams = {
  location?: string;
  type?: "Full-Time" | "Part-Time" | "Contract" | string;
};

export default function JobListPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const supabase = createClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [jobs, setJobs] = useState<any[]>([]);
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [userId, setUserId] = useState<string>(localStorage.getItem("user_id") ?? "");

  const handleLogout = async () => {
    await supabase.auth.signOut()
    localStorage.removeItem('user_id');
    redirect('/login')
  };

  useEffect(() => {
    (async () => {
      let query = supabase.from("jobs").select("*");
      if (location) {
        query = query.ilike("location", `%${location}%`);
      }
      if (type) {
        query = query.eq("type", type);
      }
      const { data, error } = await query;

      if (error) console.error(error);
      else setJobs(data);
    })();
  }, [supabase, location, type]);

  return (
    <main className="max-w-4xl mx-auto mt-10 p-6">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-6">Job Listings</h1>
        <div>
          {userId ? (
            <div className="flex gap-3">
              <Link
                href="/dashboard"
                className="inline-block bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Dashboard
              </Link>
              <a
              onClick={handleLogout}
              className="inline-block bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red- cursor-pointer transition-colors"
            >
              Logout
            </a>
            </div>
          ) : (
            <Link
              href="/login"
              className="inline-block bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Filter by location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border rounded-lg px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border rounded-lg px-3 py-2 flex-1 md:max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Job Types</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Contract">Contract</option>
        </select>
      </div>

      {jobs.length > 0 ? (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li
              key={job.id}
              className="border rounded-lg p-4 bg-white shadow hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold">{job.title}</h2>
                  <p className="text-gray-600">
                    {job.company} — {job.location}
                  </p>
                </div>
                <span className="shrink-0 inline-block mt-1 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                  {job.type}
                </span>
              </div>
              <p className="mt-2 text-gray-700">
                {job.description.length > 100
                  ? `${job.description.substr(0, 100)}...`
                  : job.description}
              </p>
              {/* View Details Button */}
              <div className="mt-4">
                <Link
                  href={`/jobs/${job.id}`}
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No jobs found for the selected filters.</p>
      )}
    </main>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { checkAuth } from "@/lib/auth/checkAuth";
import { createClient } from "@/lib/supabase/client";

export default function DashboardPage() {
  const supabase = createClient();
  const [userId, setUserId] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [jobs, setJobs] = useState<any[]>([]);

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this job?")) {
      await supabase
      .from('jobs')
      .delete()
      .eq('id', id) // choose the row(s) to delete
      .select()

      setJobs((prev) => prev.filter((job) => job.id !== id));
    }
  };

  useEffect(() => {
    (async () => {
      const user = await checkAuth();
      setUserId(user);
    })();
  }, []);

  useEffect(() => {
    if (userId) {
      (async () => {
        const { data, error } = await supabase
          .from("jobs")
          .select("*")
          .eq("user_id", userId); // filter by user_id column

        if (error) console.error(error);
        else setJobs(data);
      })();
    }
  }, [supabase, userId]);

  return (
    <main className="max-w-4xl mx-auto mt-10 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Job Posts</h1>
        <div className="flex gap-3">
          <Link
          href="/jobs/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Create New Job
        </Link>
        <Link
          href="/"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Job Listing
        </Link>
        </div>
      </div>

      {jobs.length > 0 ? (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li
              key={job.id}
              className="border rounded-lg p-4 bg-white shadow hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold">{job.title}</h2>
                  <p className="text-gray-600">
                    {job.company} — {job.location}
                  </p>
                  <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                    {job.type}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/jobs/${job.id}`}
                    className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300"
                  >
                    View
                  </Link>
                  <Link
                    href={`/jobs/${job.id}/edit`}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">You haven`t posted any jobs yet.</p>
      )}
    </main>
  );
}

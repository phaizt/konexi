"use client";

import { checkAuth } from "@/lib/auth/checkAuth";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function JobDetailsPage() {
  const { id } = useParams();
  const supabase = createClient();
  const [message, setMessage] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [job, setJob] = useState<any>(null);
  const [form, setForm] = useState(() => ({
    title: job?.title ?? "",
    company: job?.company ?? "",
    description: job?.description ?? "",
    location: job?.location ?? "",
    type: job?.type ?? "Full-Time",
  }));
  const [userId, setUserId] = useState("");

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
      else {
        setJob(data);
        setForm(data);
      }
    })();
  }, [supabase]);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const { data, error } = await supabase
      .from("jobs")
      .update({ ...form })
      .eq("id", id); // choose the row(s) to update

    if (error) {
      setError(error?.details || "Something went wrong");
    } else {
      setMessage("Job post update successfully!");
    }
    setSaving(false);
  }

  return (
    <main className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Edit Job</h1>

      {error && <p className="mb-4 text-red-600">{error}</p>}
      {message && <p className="mb-4 text-green-600 font-medium">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium" htmlFor="title">
            Job Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Frontend Developer"
          />
        </div>

        {/* Company */}
        <div>
          <label className="block mb-1 font-medium" htmlFor="company">
            Company Name
          </label>
          <input
            id="company"
            name="company"
            type="text"
            value={form.company}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Acme Corp"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium" htmlFor="description">
            Job Description
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={6}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe responsibilities, requirements, etc."
          />
        </div>

        {/* Location */}
        <div>
          <label className="block mb-1 font-medium" htmlFor="location">
            Location
          </label>
          <input
            id="location"
            name="location"
            type="text"
            value={form.location}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Remote, New York"
          />
        </div>

        {/* Job Type */}
        <div>
          <label className="block mb-1 font-medium" htmlFor="type">
            Job Type
          </label>
          <select
            id="type"
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <Link
            href={`/`}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { checkAuth } from "@/lib/auth/checkAuth";
import { redirect } from "next/navigation";

export default function NewJobPage() {
  // Simulated auth check (replace with your auth logic)
  //   const isAuthenticated = true;

  const [form, setForm] = useState({
    title: "",
    company: "",
    description: "",
    location: "",
    type: "Full-Time",
  });

  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");
  const supabase = createClient();

  useEffect(() => {
    (async () => {
      const user = await checkAuth();
      setUserId(user);
    })();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: send data to API or server action
    const { error } = await supabase
      .from("jobs")
      .insert([{ user_id: userId, ...form }]);
    setMessage("Job post created successfully!");
    setForm({
      title: "",
      company: "",
      description: "",
      location: "",
      type: "Full-Time",
    });
    if(error){
      setMessage(error.message)
    }
  };

  return (
    <main className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Create Job Post</h1>

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
            rows={5}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe the role, responsibilities, and requirements..."
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

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create Job
        </button>
        <button
          onClick={() => redirect("/dashboard")}
          className="bg-red-600 text-white px-4 py-2 rounded-lg ml-3 hover:bg-red-700 transition-colors"
        >
          Cancel
        </button>
      </form>
    </main>
  );
}

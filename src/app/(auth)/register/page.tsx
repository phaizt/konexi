// app/login/page.tsx
"use client";

import React, { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    // TODO: Handle login logic here
    if (!error) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        // kirim ke dashboard setelah verifikasi email (sesuai pengaturan Supabase)
        options: {
          data: { role: "user" }, // optional: user_metadata
        },
      });
      if (error?.message) {
        setError(error?.message);
      } else {
        setIsSuccess(true);
        setTimeout(() => {
          redirect("/login");
        }, 1000);
      }
    }
  };

  return (
    <main className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        {isSuccess && (
          <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">
            Register Success
          </h2>
        )}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                // also use HTML5 validation for instant feedback
                if (e.target.value !== password) {
                  setError("Password confirm doesn`t match");
                } else {
                  setError(null);
                }
              }}
            />
            {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
          </div>
          <button
            disabled={!!error?.length || loading}
            type="submit"
            className={`w-full text-white py-2 rounded-md transition flex justify-center gap-3 ${
              error ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Register
            {loading && (
              <div className="flex items-center justify-center">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              </div>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}

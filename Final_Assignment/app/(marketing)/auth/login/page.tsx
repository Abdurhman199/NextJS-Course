"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/recipes";

  const [loading, setLoading] = useState(false);

  const login = () => {
    setLoading(true);

    // fake login: set cookie manually
    document.cookie = "__session=true; path=/";

    window.location.href = callbackUrl;
  };

  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Login</h1>

      <p className="text-sm text-gray-600">
        Callback URL: <span className="font-mono">{callbackUrl}</span>
      </p>

      <button
        onClick={login}
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
}
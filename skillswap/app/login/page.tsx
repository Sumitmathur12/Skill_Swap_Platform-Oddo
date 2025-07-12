"use client";

import { useState } from "react";

const dummyUser = {
  email: "user@example.com",
  password: "123456",
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === dummyUser.email && password === dummyUser.password) {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-sm w-full bg-white p-6 rounded-xl shadow-md">
        {isLoggedIn ? (
          <div className="text-center space-y-3">
            <h2 className="text-2xl font-bold text-green-700">Welcome!</h2>
            <p className="text-gray-700">You are logged in as: {email}</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
              Login
            </h2>
            {error && <p className="text-red-600 text-center">{error}</p>}
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded text-gray-900"
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded text-gray-900 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-sm text-blue-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
              >
                Login
              </button>
            </form>
            <p className="text-sm text-center mt-4 text-gray-600">
              Don’t have an account?{" "}
              <a href="/register" className="text-blue-600 hover:underline">
                Register
              </a>
            </p>
          </>
        )}
      </div>
    </main>
  );
}

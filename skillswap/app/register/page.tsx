"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [skillsOffered, setSkillsOffered] = useState<string[]>([]);
  const [skillsWanted, setSkillsWanted] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
    availability: "",
    profileType: "public",
    skillsOfferedInput: "",
    skillsWantedInput: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSkillAdd = (type: "offered" | "wanted") => {
    const key = type === "offered" ? "skillsOfferedInput" : "skillsWantedInput";
    const input = formData[key].trim();

    if (input) {
      const skillArray = input
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      if (type === "offered")
        setSkillsOffered([...skillsOffered, ...skillArray]);
      else setSkillsWanted([...skillsWanted, ...skillArray]);

      setFormData({ ...formData, [key]: "" });
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Registered successfully! Now login.");
    router.push("/login");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="max-w-xl w-full bg-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-white">
          Register
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            name="name"
            placeholder="Name"
            required
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-700 text-white placeholder-gray-400"
          />
          <input
            name="email"
            placeholder="Email"
            type="email"
            required
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-700 text-white placeholder-gray-400"
          />
          <input
            name="password"
            placeholder="Password"
            type="password"
            required
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-700 text-white placeholder-gray-400"
          />
          <input
            name="location"
            placeholder="Location"
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-700 text-white placeholder-gray-400"
          />
          <input
            name="availability"
            placeholder="Availability (e.g. Weekends)"
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-700 text-white placeholder-gray-400"
          />
          <select
            name="profileType"
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-700 text-white"
          >
            <option value="public">Public Profile</option>
            <option value="private">Private Profile</option>
          </select>

          {/* Skills Offered */}
          <div>
            <label className="block text-sm font-semibold text-white mb-1">
              Skills Offered
            </label>
            <div className="flex gap-2">
              <input
                name="skillsOfferedInput"
                placeholder="e.g. Photoshop, Excel"
                value={formData.skillsOfferedInput}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-gray-700 text-white placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => handleSkillAdd("offered")}
                className="px-3 bg-blue-500 hover:bg-blue-600 text-white rounded"
              >
                Add
              </button>
            </div>
            {skillsOffered.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2 text-sm">
                {skillsOffered.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-600 text-white font-medium px-3 py-1 rounded-full shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Skills Wanted */}
          <div>
            <label className="block text-sm font-semibold text-white mb-1">
              Skills Wanted
            </label>
            <div className="flex gap-2">
              <input
                name="skillsWantedInput"
                placeholder="e.g. React, Tailwind"
                value={formData.skillsWantedInput}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-gray-700 text-white placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => handleSkillAdd("wanted")}
                className="px-3 bg-blue-500 hover:bg-blue-600 text-white rounded"
              >
                Add
              </button>
            </div>
            {skillsWanted.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2 text-sm">
                {skillsWanted.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-green-600 text-white font-medium px-3 py-1 rounded-full shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded"
          >
            Register
          </button>
        </form>
        <p className="text-sm mt-4 text-center text-gray-300">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </main>
  );
}

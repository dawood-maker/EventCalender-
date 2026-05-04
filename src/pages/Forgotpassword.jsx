import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email },
      );

      navigate("/verify-otp", { state: { email, type: "reset" } });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#6d6875] to-[#b5838d] px-4 py-6">
      {/* CARD */}
      <div className="w-[92%] sm:w-[420px] md:w-[400px] bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 p-6 sm:p-8 text-center">
        {/* TITLE */}
        <h1 className="text-lg sm:text-xl font-semibold text-gray-600 mb-5 sm:mb-6">
          Calendar
        </h1>

        {/* ICON */}
        <div className="flex justify-center mb-5">
          <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center bg-teal-100 rounded-2xl text-xl sm:text-2xl">
            🔒
          </div>
        </div>

        {/* HEADING */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
          Forgot Your Password?
        </h2>

        <p className="text-gray-500 text-xs sm:text-sm mb-6 leading-relaxed">
          No worries! Enter your email and we'll send you an OTP.
        </p>

        {/* ERROR */}
        {error && (
          <p className="mb-4 text-xs text-red-600 bg-red-50 p-2 rounded-lg">
            {error}
          </p>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 bg-white border border-transparent focus:border-teal-500 focus:ring-2 focus:ring-teal-200 rounded-xl outline-none transition text-sm"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-teal-700 to-teal-900 text-white py-3 rounded-xl font-semibold shadow-md hover:scale-[1.02] transition disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>

        {/* BACK LINK */}
        <div className="mt-5">
          <Link
            to="/login"
            className="text-sm text-teal-700 hover:underline font-medium"
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;

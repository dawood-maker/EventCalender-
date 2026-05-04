import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  console.log("ResetPassword page loaded");
  console.log("Location state:", state);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submit clicked");
    console.log("Password:", password);
    console.log("Confirm Password:", confirm);

    if (password !== confirm) {
      console.log("Password mismatch error");
      return setError("Passwords match nahi karte");
    }

    setLoading(true);
    setError("");

    console.log("Sending reset password request...");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/reset-password",
        {
          email: state.email,
          otp: state.otp,
          newPassword: password,
        },
      );

      console.log("Reset password success:", res.data);

      navigate("/login");
    } catch (err) {
      console.log("Reset password error:", err);
      console.log("Error response:", err.response);

      setError(err.response?.data?.message || "something went wrong");
    } finally {
      console.log("Loading finished");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#6d6875] to-[#b5838d] px-4">
      <div className="w-[380px] bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 p-8 text-center">
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 flex items-center justify-center bg-teal-100 rounded-2xl text-2xl">
            🔑
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">Naya Password</h2>
        <p className="text-gray-500 text-sm mb-6">
          Apna naya password set karo.
        </p>

        {error && (
          <p className="mb-4 text-xs text-red-600 bg-red-50 p-2 rounded-lg">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="text-sm text-gray-700 font-medium">
              New Password
            </label>
            <input
              type="password"
              placeholder="Naya password"
              value={password}
              onChange={(e) => {
                console.log("Password input changed:", e.target.value);
                setPassword(e.target.value);
              }}
              required
              className="w-full mt-1 px-4 py-3 bg-white border border-transparent focus:border-teal-500 focus:ring-2 focus:ring-teal-200 rounded-xl outline-none transition text-sm"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700 font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Dobara dalein"
              value={confirm}
              onChange={(e) => {
                console.log("Confirm password changed:", e.target.value);
                setConfirm(e.target.value);
              }}
              required
              className="w-full mt-1 px-4 py-3 bg-white border border-transparent focus:border-teal-500 focus:ring-2 focus:ring-teal-200 rounded-xl outline-none transition text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-teal-700 to-teal-900 text-white py-3 rounded-xl font-semibold shadow-md hover:scale-[1.02] transition disabled:opacity-60"
          >
            {loading ? "Reset ho raha hai..." : "Password Reset Karo"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;

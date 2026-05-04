import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function VerifyOtp() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const email = state?.email;
  const type = state?.type; // "register" ya "reset"

  console.log("VerifyOtp page loaded");
  console.log("State received:", state);
  console.log("Email:", email);
  console.log("Type:", type);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("OTP submit clicked");
    console.log("Entered OTP:", otp);

    setError("");
    setLoading(true);

    console.log("Starting OTP verification...");

    try {
      if (type === "register") {
        console.log("Register OTP verification flow");

        const res = await axios.post(
          "http://localhost:5000/api/auth/verify-otp",
          {
            email,
            otp,
          },
        );

        console.log("Register OTP success response:", res.data);

        login(res.data.user, res.data.token);
        navigate("/");
      } else if (type === "reset") {
        console.log("Reset OTP verification flow");

        const res = await axios.post(
          "http://localhost:5000/api/auth/verify-reset-otp",
          {
            email,
            otp,
          },
        );

        console.log("Reset OTP success response:", res.data);

        navigate("/reset-password", { state: { email, otp } });
      } else {
        console.log("Invalid type detected:", type);
      }
    } catch (err) {
      console.log("OTP verification error:", err);
      console.log("Error response:", err.response);

      setError(err.response?.data?.message || "the otp is wrong");
    } finally {
      console.log("Loading finished");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#6d6875] to-[#b5838d] px-4">
      <div className="w-[360px] bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 p-8 text-center">
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 flex items-center justify-center bg-teal-100 rounded-2xl text-2xl">
            📧
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">OTP Verify</h2>
        <p className="text-gray-500 text-sm mb-2">we have sent a OTP:</p>
        <p className="text-teal-700 font-semibold text-sm mb-6">{email}</p>

        {error && (
          <p className="mb-4 text-xs text-red-600 bg-red-50 p-2 rounded-lg">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="6-digit OTP dalein"
            maxLength={6}
            value={otp}
            onChange={(e) => {
              console.log("OTP input changed:", e.target.value);
              setOtp(e.target.value);
            }}
            className="w-full px-4 py-3 mb-5 bg-white border border-transparent focus:border-teal-500 focus:ring-2 focus:ring-teal-200 rounded-xl outline-none transition text-sm text-center tracking-widest text-lg font-bold"
          />

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="w-full bg-gradient-to-r from-teal-700 to-teal-900 text-white py-3 rounded-xl font-semibold shadow-md hover:scale-[1.02] transition disabled:opacity-60"
          >
            {loading ? "Working..." : "Verify Karo"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyOtp;

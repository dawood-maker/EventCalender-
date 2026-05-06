import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";
import eyeOpen from "../assets/passwordRight.png";
import eyeClose from "../assets/passwordHidden.png";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [unverified, setUnverified] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setUnverified(false);
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form,
      );
      login(res.data.user, res.data.token);
      navigate("/");
    } catch (err) {
      const msg = err.response?.data?.message;
      if (err.response?.status === 403) {
        setError("Your account has not been verified. First do the vatap warfe.");
        setUnverified(true);
      } else {
        setError(msg || "Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoToVerify = () => {
    navigate("/verify-otp", {
      state: { email: form.email, type: "register" },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#6d6875] to-[#b5838d] px-4 py-6">
      <div className="w-[92%] sm:w-[420px] md:w-[400px] bg-[#f5f5f5]/90 backdrop-blur-lg p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/30">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
          Welcome Back
        </h2>
        <p className="text-xs sm:text-sm text-center text-gray-500 mt-2 mb-6 sm:mb-8">
          Sign in to access your dashboard.
        </p>

        {error && (
          <div className="mb-4 text-xs text-red-600 bg-red-50 p-3 rounded-lg text-center">
            <p>{error}</p>
            {unverified && (
              <button
                onClick={handleGoToVerify}
                className="mt-2 text-teal-700 font-semibold underline hover:text-teal-900"
              >
                OTP Verify Karein →
              </button>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <div className="flex items-center bg-white rounded-xl px-3 py-2 mt-1">
              <img src={email_icon} className="w-5 h-5 mr-2 opacity-70" />
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full outline-none text-sm bg-white"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="flex items-center bg-white rounded-xl px-3 py-2 mt-1">
              <img src={password_icon} className="w-5 h-5 mr-2 opacity-70" />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full outline-none text-sm bg-white"
              />
              <span
                className="cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                <img
                  src={showPassword ? eyeClose : eyeOpen}
                  className="w-5 h-5 ml-1 opacity-70 hover:opacity-100"
                />
              </span>
            </div>
          </div>

          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-xs sm:text-sm text-teal-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-teal-700 to-teal-900 text-white py-2.5 rounded-xl font-medium shadow-md hover:scale-[1.02] transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Sign In"}
          </button>
        </form>

        <div className="flex items-center my-5 sm:my-6">
          <hr className="flex-1 border-gray-300" />
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <p className="text-xs sm:text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-teal-700 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

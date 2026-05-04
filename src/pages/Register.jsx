import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";
import eyeOpen from "../assets/passwordRight.png";
import eyeClose from "../assets/passwordHidden.png";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match");
    }

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      // Register ke baad OTP page par jao
      navigate("/verify-otp", {
        state: { email: form.email, type: "register" },
      });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#6d6875] to-[#b5838d] px-4 py-6">
      <div className="w-[92%] sm:w-[420px] md:w-[400px] bg-[#f5f5f5]/90 backdrop-blur-lg p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/30">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
          Create Account
        </h2>
        <p className="text-xs sm:text-sm text-center text-gray-500 mt-2 mb-6">
          Sign up to get started.
        </p>

        {error && (
          <p className="mb-4 text-xs text-red-600 bg-red-50 p-2 rounded-lg text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* NAME */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div className="flex items-center bg-white rounded-xl px-3 py-2 mt-1">
              <input
                name="name"
                type="text"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full outline-none text-sm bg-white"
              />
            </div>
          </div>

          {/* EMAIL */}
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

          {/* PASSWORD */}
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

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="flex items-center bg-white rounded-xl px-3 py-2 mt-1">
              <img src={password_icon} className="w-5 h-5 mr-2 opacity-70" />
              <input
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm your password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="w-full outline-none text-sm bg-white"
              />
              <span
                className="cursor-pointer"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                <img
                  src={showConfirm ? eyeClose : eyeOpen}
                  className="w-5 h-5 ml-1 opacity-70 hover:opacity-100"
                />
              </span>
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-teal-700 to-teal-900 text-white py-2.5 rounded-xl font-medium shadow-md hover:scale-[1.02] transition disabled:opacity-60"
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>

        <div className="flex items-center my-5">
          <hr className="flex-1 border-gray-300" />
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <p className="text-xs sm:text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-teal-700 font-medium hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

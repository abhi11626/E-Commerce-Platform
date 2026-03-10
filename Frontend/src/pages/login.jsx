import { useActionState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import SubmitButton from "./Submit.jsx";

import {
  isEmail,
  isNotEmpty,
  hasMinLength,
} from "../components/utils/validation.js";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

async function loginAction(prevFormState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  let errors = [];

  if (!isEmail(email)) {
    errors.push("Please enter a valid email address.");
  }

  if (!isNotEmpty(password) || !hasMinLength(password, 6)) {
    errors.push("Password must be at least 6 characters long.");
  }

  if (errors.length > 0) {
    return {
      errors,
      enteredValues: { email, password },
    };
  }

  try {
    const res = await fetch(`${backendUrl}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    let data = {};
    try {
      data = await res.json();
    } catch {
      data = {};
    }

    if (!res.ok) {
      return {
        errors: [
          data.error || data.message || `Login failed (status ${res.status})`,
        ],
        enteredValues: { email, password },
      };
    }

    return {
      errors: null,
      token: data.token,
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      errors: ["Server error. Please try again."],
      enteredValues: { email, password },
    };
  }
}
export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formState, formAction] = useActionState(loginAction, {
    errors: null,
    enteredValues: {},
    token: null,
  });

  useEffect(() => {
    if (!formState.errors) return;

    const shouldRedirectToSignup = formState.errors.some(
      (msg) =>
        typeof msg === "string" && msg.toLowerCase().includes("user not found"),
    );

    if (!shouldRedirectToSignup) return;

    const id = setTimeout(() => {
      navigate("/signup");
    }, 3000);

    return () => clearTimeout(id);
  }, [formState.errors, navigate]);

  // useEffect(() => {
  //   if (formState.errors) {
  //     const id = setTimeout(() => {
  //       navigate("/signup");
  //     }, 5000);
  //     return () => clearTimeout(id);
  //   }
  // }, [formState.errors, navigate]);

  useEffect(() => {
    if (!formState.token) return;
    login(formState.token);
    navigate("/", { replace: true });
  }, [formState.token, login, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <form
        action={formAction}
        className="w-full max-w-md bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20 text-white space-y-6 transition-all duration-500"
      >
        <h2 className="text-3xl font-bold text-center">Login</h2>

        {/* Email */}
        <div>
          <label className="block text-sm mb-2">Email</label>
          <input
            type="email"
            name="email"
            defaultValue={formState.enteredValues?.email || ""}
            className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm mb-2">Password</label>
          <input
            type="password"
            name="password"
            defaultValue={formState.enteredValues?.password || ""}
            className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Errors */}
        {formState.errors && (
          <ul className="bg-red-500/20 border border-red-400 text-red-300 p-4 rounded-lg space-y-1 animate-fadeIn">
            {formState.errors.map((error) => (
              <li key={error}>• {error}</li>
            ))}
          </ul>
        )}

        {/* Buttons */}
        <div className="flex justify-between items-center pt-4">
          <button
            type="reset"
            className="px-5 py-2 rounded-lg border border-white/30 
             text-gray-300 hover:bg-white/10 
             hover:text-white transition-all duration-300 active:scale-95"
          >
            Reset
          </button>

          <SubmitButton />
        </div>
        {/* New User Option */}
        <p className="text-center text-sm text-gray-300 pt-4">
          New user?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-indigo-400 cursor-pointer hover:text-indigo-300 underline"
          >
            Create an account
          </span>
        </p>
      </form>
    </div>
  );
}

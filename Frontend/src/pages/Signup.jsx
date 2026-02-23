import { useActionState } from "react";
import SubmitButton from "./Submit.jsx";

import {
  isEmail,
  isNotEmpty,
  isEqualsToOtherValue,
  hasMinLength,
} from "../components/utils/validation.js";

async function signupAction(prevFormState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirm-password");
  const firstName = formData.get("first-name");
  const lastName = formData.get("last-name");
  const terms = formData.get("terms");

  let errors = [];

  if (!isEmail(email)) {
    errors.push("Please enter a valid email address.");
  }
  if (!isNotEmpty(password) || !hasMinLength(password, 6)) {
    errors.push("Password must be at least 6 characters long.");
  }
  if (!isEqualsToOtherValue(password, confirmPassword)) {
    errors.push("Passwords do not match.");
  }
  if (!isNotEmpty(firstName) || !isNotEmpty(lastName)) {
    errors.push("Please provide your first and last name.");
  }
  if (!terms) {
    errors.push("You must agree to the terms and conditions.");
  }
  //  Fake delay to test pending state

  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (errors.length > 0) {
    return {
      errors,
      success: false,
      enteredValues: {
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
        terms,
      },
    };
  }

  return {
    errors: null,
    success: true,
    enteredValues: {},
  };
}

export default function Signup() {
  const [formState, formAction] = useActionState(signupAction, {
    errors: null,
    success: false,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <form
        action={formAction}
        className="w-full max-w-lg bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20 text-white space-y-6 transition-all duration-500"
      >
        <h2 className="text-3xl font-bold text-center">Create Account</h2>

        {/* Success Message */}
        {formState.success && (
          <div className="bg-green-500/20 border border-green-400 text-green-300 px-4 py-3 rounded-lg animate-fadeIn">
            🎉 Account created successfully!
          </div>
        )}

        {/* Name Row */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="first-name"
            placeholder="First Name"
            defaultValue={formState.enteredValues?.firstName || ""}
            className="px-4 py-2 rounded-lg bg-white/20 border border-white/30 focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            name="last-name"
            placeholder="Last Name"
            defaultValue={formState.enteredValues?.lastName || ""}
            className="px-4 py-2 rounded-lg bg-white/20 border border-white/30 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

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

        {/* Password Row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2">Password</label>
            <input
              type="password"
              name="password"
              defaultValue={formState.enteredValues?.password || ""}
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Confirm</label>
            <input
              type="password"
              name="confirm-password"
              defaultValue={formState.enteredValues?.confirmPassword || ""}
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Terms */}
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="terms"
            defaultChecked={formState.enteredValues?.terms || false}
            className="accent-indigo-500"
          />
          I agree to the terms and conditions
        </label>

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
      </form>
    </div>
  );
}

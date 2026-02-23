import { useActionState } from "react";
import SubmitButton from "../pages/Submit.jsx";

export default function Contact() {
  async function contactAction(prevState, formData) {
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    let errors = [];

    if (!name || name.trim().length === 0) {
      errors.push("Please enter your name.");
    }

    if (!email || !email.includes("@")) {
      errors.push("Please enter a valid email.");
    }

    if (!message || message.trim().length < 10) {
      errors.push("Message must be at least 10 characters.");
    }

    //  Fake delay to test pending state
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (errors.length > 0) {
      return {
        errors,
        success: false,
        enteredValues: { name, email, message },
      };
    }

    return {
      errors: null,
      success: true,
      enteredValues: {},
    };
  }

  const [formState, formAction] = useActionState(contactAction, {
    errors: null,
    success: false,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <form
        action={formAction}
        className="w-full max-w-xl bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20 text-white space-y-6 transition-all duration-500"
      >
        <h2 className="text-3xl font-bold text-center">Contact Us</h2>

        {/* Success Message */}
        {formState.success && (
          <div className="bg-green-500/20 border border-green-400 text-green-300 px-4 py-3 rounded-lg animate-fadeIn">
            ✅ Message sent successfully! We'll get back to you soon.
          </div>
        )}

        {/* Name */}
        <div>
          <label className="block text-sm mb-2">Name</label>
          <input
            type="text"
            name="name"
            defaultValue={formState.enteredValues?.name || ""}
            className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm mb-2">Email</label>
          <input
            type="email"
            name="email"
            defaultValue={formState.enteredValues?.email || ""}
            className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm mb-2">Message</label>
          <textarea
            name="message"
            rows="4"
            defaultValue={formState.enteredValues?.message || ""}
            className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 focus:ring-2 focus:ring-indigo-500 resize-none"
          ></textarea>
        </div>

        {/* Errors */}
        {formState.errors && (
          <ul className="bg-red-500/20 border border-red-400 text-red-300 p-4 rounded-lg space-y-1 animate-fadeIn">
            {formState.errors.map((error) => (
              <li key={error}>• {error}</li>
            ))}
          </ul>
        )}

        <SubmitButton />
      </form>
    </div>
  );
}

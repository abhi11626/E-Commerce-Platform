import { useState, useEffect } from "react";

export default function Health() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
  const [backendHealth, setBackendHealth] = useState(null);
  const [backendError, setBackendError] = useState(null);

  useEffect(() => {
    fetch(`${backendUrl}/api/health`)
      .then((res) => res.json())
      .then((data) => setBackendHealth(data))
      .catch((err) => setBackendError(err.message));
  }, [backendUrl]);

  const envVars = {
    VITE_BACKEND_URL: import.meta.env.VITE_BACKEND_URL || "NOT SET (fallback: http://localhost:5000)",
    MODE: import.meta.env.MODE,
    DEV: import.meta.env.DEV,
    PROD: import.meta.env.PROD,
  };

  const StatusDot = ({ ok }) => (
    <span className={`inline-block w-3 h-3 rounded-full mr-2 ${ok ? "bg-green-400" : "bg-red-400"}`} />
  );

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
        Health Check
      </h1>

      {/* Frontend Status */}
      <div className="bg-gray-900/70 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          <StatusDot ok={true} /> Frontend
        </h2>
        <table className="w-full text-sm">
          <tbody>
            {Object.entries(envVars).map(([key, value]) => (
              <tr key={key} className="border-b border-white/5">
                <td className="py-2 text-gray-400 font-mono">{key}</td>
                <td className={`py-2 font-mono ${String(value).includes("NOT SET") ? "text-red-400" : "text-green-400"}`}>
                  {String(value)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Backend Status */}
      <div className="bg-gray-900/70 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          <StatusDot ok={!!backendHealth} /> Backend
          <span className="text-sm font-normal text-gray-400 ml-2">({backendUrl}/api/health)</span>
        </h2>

        {backendHealth ? (
          <table className="w-full text-sm">
            <tbody>
              {Object.entries(backendHealth).map(([key, value]) => (
                <tr key={key} className="border-b border-white/5">
                  <td className="py-2 text-gray-400 font-mono">{key}</td>
                  <td className={`py-2 font-mono ${
                    String(value).includes("MISSING") ? "text-red-400" : "text-green-400"
                  }`}>
                    {String(value)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : backendError ? (
          <p className="text-red-400 font-mono text-sm">Connection failed: {backendError}</p>
        ) : (
          <p className="text-gray-400 text-sm">Checking...</p>
        )}
      </div>
    </div>
  );
}

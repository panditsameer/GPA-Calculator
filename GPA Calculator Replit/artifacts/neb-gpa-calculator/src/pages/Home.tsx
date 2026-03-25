import { useState, useEffect } from "react";
import ManagementCalculator from "@/pages/Calculator";
import ScienceCalculator from "@/pages/ScienceCalculator";

type Stream = "management" | "science";

export default function Home() {
  const [stream, setStream] = useState<Stream>("management");
  const [darkMode, setDarkMode] = useState(false);
  const [glassMode, setGlassMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("nebTheme");
    if (stored) {
      const t = JSON.parse(stored);
      setDarkMode(t.dark ?? false);
      setGlassMode(t.glass ?? false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("nebTheme", JSON.stringify({ dark: darkMode, glass: glassMode }));
  }, [darkMode, glassMode]);

  const bgClass = glassMode
    ? darkMode
      ? "bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950"
      : "bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600"
    : darkMode
      ? "bg-gradient-to-br from-gray-900 via-gray-950 to-slate-900"
      : "bg-gradient-to-br from-indigo-50 via-white to-purple-50";

  return (
    <div className={`min-h-screen transition-colors duration-300 ${bgClass} ${darkMode ? "dark" : ""} ${glassMode ? "glass-mode" : ""}`}>
      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* Header */}
        <header className="text-center mb-8 relative">
          {/* Theme toggles */}
          <div className="absolute right-0 top-0 flex items-center gap-2">
            <button
              onClick={() => setGlassMode(g => !g)}
              title={glassMode ? "Disable Glass Mode" : "Enable Glass Mode"}
              className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all duration-200 border shadow-sm
                ${glassMode
                  ? "bg-purple-500/30 border-purple-400/40 text-purple-200 backdrop-blur"
                  : darkMode
                    ? "bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"
                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
            >
              ✨
            </button>
            <button
              onClick={() => setDarkMode(d => !d)}
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all duration-200 border shadow-sm
                ${darkMode
                  ? "bg-indigo-500/30 border-indigo-400/40 text-yellow-300 backdrop-blur"
                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>

          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4 shadow
            ${darkMode ? "bg-indigo-500/30 text-indigo-300 border border-indigo-500/30 backdrop-blur" : "bg-indigo-600 text-white"}`}>
            <span>📊</span> NEB Grading System
          </div>
          <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${darkMode ? "text-white" : "text-slate-800"}`}>
            NEB Grade 12 GPA Calculator
          </h1>
          <p className={darkMode ? "text-slate-400 text-base" : "text-slate-500 text-base"}>
            Accurate GPA Calculation Based on NEB Grading System
          </p>
        </header>

        {/* Stream Toggle */}
        <div className="flex justify-center mb-8">
          <div className={`inline-flex rounded-2xl p-1.5 gap-1.5 border shadow-md
            ${darkMode
              ? "bg-gray-800/80 border-gray-700 backdrop-blur"
              : glassMode
                ? "bg-white/20 border-white/30 backdrop-blur"
                : "bg-white border-slate-200"}`}>
            <button
              onClick={() => setStream("management")}
              className={`px-7 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
                ${stream === "management"
                  ? "bg-indigo-600 text-white shadow-md"
                  : darkMode
                    ? "text-slate-400 hover:text-slate-200 hover:bg-slate-700"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"}`}
            >
              <span className="flex items-center gap-2">💼 Management</span>
            </button>
            <button
              onClick={() => setStream("science")}
              className={`px-7 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
                ${stream === "science"
                  ? "bg-emerald-600 text-white shadow-md"
                  : darkMode
                    ? "text-slate-400 hover:text-slate-200 hover:bg-slate-700"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"}`}
            >
              <span className="flex items-center gap-2">🔬 Science</span>
            </button>
          </div>
        </div>

        {/* Stream description */}
        <div className="flex justify-center mb-6">
          {stream === "management" ? (
            <span className={`text-xs px-3 py-1 rounded-full font-medium border
              ${darkMode ? "text-indigo-300 bg-indigo-900/30 border-indigo-800" : "text-indigo-700 bg-indigo-50 border-indigo-100"}`}>
              Management Stream — English, Nepali, Math/Social + 3 Optional Subjects
            </span>
          ) : (
            <span className={`text-xs px-3 py-1 rounded-full font-medium border
              ${darkMode ? "text-emerald-300 bg-emerald-900/30 border-emerald-800" : "text-emerald-700 bg-emerald-50 border-emerald-100"}`}>
              Science Stream — English, Nepali, Physics, Chemistry, Mathematics + Optional (Computer / Biology)
            </span>
          )}
        </div>

        {stream === "management" ? <ManagementCalculator /> : <ScienceCalculator />}

        {/* Footer credits */}
        <p className={`text-center text-xs mt-10 ${darkMode ? "text-slate-600" : "text-slate-400"}`}>
          NEB Grade 12 GPA Calculator · Based on official NEB grading system
        </p>
      </div>
    </div>
  );
}

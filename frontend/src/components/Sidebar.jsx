import { useState } from "react";
import {
    FiHome,
    FiSettings,
    FiLogOut,
    FiUser,
    FiMenu
} from "react-icons/fi";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={`flex flex-col ${
        isOpen ? "w-60" : "w-20"
      } bg-white min-h-screen p-4 shadow-md transition-all duration-300`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="self-end text-xl text-slate-600 hover:text-violet-600 mb-2"
        title={isOpen ? "Close Sidebar" : "Open Sidebar"}
      >
        {isOpen ? "←" : "→"}
      </button>

      {/* Logo / Title */}
      <h1
        className={`font-bold text-violet-600 text-center my-4 ${
          isOpen ? "text-3xl" : "text-xl"
        }`}
      >
        {isOpen ? "StudyMate AI" : "📚"}
      </h1>

      {/* Navigation */}
      <nav className="flex flex-1">
        <ul className="flex flex-col w-full">
          <li
            className={`p-3 bg-violet-400 cursor-pointer rounded-lg transition duration-200 hover:bg-violet-400 my-3 text-white ${
              !isOpen ? "text-center" : ""
            }`}
          >
            {isOpen ? "Dashboard" : "🏠"}
          </li>

          <li
            className={`p-3 bg-white cursor-pointer rounded-lg transition duration-200 hover:bg-violet-400 my-3 text-slate-600 ${
              !isOpen ? "text-center" : ""
            }`}
          >
            {isOpen ? "Settings" : "⚙️"}
          </li>

          <li
            className={`p-3 bg-white cursor-pointer rounded-lg transition duration-200 hover:bg-violet-400 my-3 text-slate-600 ${
              !isOpen ? "text-center" : ""
            }`}
          >
            {isOpen ? "Logout" : "🚪"}
          </li>
        </ul>
      </nav>

      {/* Profile */}
      <div
        className={`text-center justify-center mt-8 p-4 bg-violet-100 rounded-lg cursor-pointer transition duration-200 hover:bg-violet-500 active:scale-95 ${
          !isOpen ? "text-sm px-2" : ""
        }`}
      >
        {isOpen ? "Profile" : "👤"}
      </div>
    </aside>
  );
}

export default Sidebar;

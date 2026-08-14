import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SubjectPage from "./pages/SubjectPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/subject/:id" element={<SubjectPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
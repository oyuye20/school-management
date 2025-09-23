import React, {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useState,
} from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { http } from "./services/http";
import { Route, Router, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { Home, Settings } from "lucide-react";
import { Dashboard } from "./pages/Dashboard";
import StudentLists from "./pages/StudentLists.tsx";
import Teachers from "./pages/Teachers";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />

        <Route element={<ProtectedRoute />}></Route>

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/lists" element={<StudentLists />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/teachers" element={<Teachers />} />
      </Routes>
    </>
  );
}

export default App;

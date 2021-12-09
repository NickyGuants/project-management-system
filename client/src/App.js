import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Projects from "./pages/projects/Projects";
import Tasks from "./pages/tasks/Tasks";
import Users from "./pages/users/Users";
import Settings from "./pages/settings/Settings";
import Admin from "./components/admin/Admin";
import LandingPage from "./pages/landing/LandingPage";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />}>
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
          </Route>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/admin" element={<Admin />}>
            <Route path="projects" element={<Projects />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="users" element={<Users />} />
          </Route>

          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage/LandingPage";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import Projects from "./pages/admin/projects/Projects.js";
import Tasks from "./pages/admin/tasks/Tasks.js";
import Users from "./pages/admin/users/Users.js";
import Admin from "./pages/admin/navigation/Admin";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="/admin" element={<Admin />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="projects" element={<Projects />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="users" element={<Users />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

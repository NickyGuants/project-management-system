import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/header/Header'
import Register from './components/register/Register';
import Login from './components/login/Login';
import Navigation from './components/navigation/Navigation';
import Dashboard from './pages/dashboard/Dashboard';
import Projects from './pages/projects/Projects'
import Tasks from './pages/tasks/Tasks'
import Users from './pages/users/Users'
import Settings from './pages/settings/Settings'

function App() {
  return (
    <div className="app">
    <Router>
      
      <div className="container">
          <Navigation />
          <div className="main">
          <Header />
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings/>} />

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          </div>
      </div>  
      </Router>
      </div>
  );
}

export default App;

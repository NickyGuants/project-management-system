import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home';
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
      <Header />
      <div className="container">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings/>} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>  
      </Router>
      </div>
  );
}

export default App;

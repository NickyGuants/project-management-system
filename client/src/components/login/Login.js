import React, { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/userActions";
import { useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  //const location = useLocation();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  let is_admin = userInfo?.user.is_admin;

  if (is_admin === true) {
    navigate("/admin/dashboard");
  }
  if (is_admin === false) {
    navigate("/dashboard");
  }

  // useEffect(() => {
  //   if (is_admin) {
  //     navigate("/admin");
  //     return;
  //   }
  //   navigate("/dashboard");
  // }, [is_admin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //dispatch the login action
    dispatch(login(email, password));
  };

  return (
    <div className="form">
      <h1>Sign In</h1>
      {error && <h2>{error}</h2>}
      {loading && <h2>Loading</h2>}
      <form onSubmit={handleSubmit}>
        <div className="child">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="child">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <button type="submit">Sign In</button>
        </div>

        <div>
          <p>
            Don't Have an Account yet? <Link to="/register">Register!</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;

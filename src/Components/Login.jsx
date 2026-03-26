import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await axios.get(
        `http://localhost:8080/users?email=${loginData.email}&password=${loginData.password}`,
      );

      if (res.data.length > 0) {
        alert("Login successful!");

        // store user (simple auth)
        localStorage.setItem("user", JSON.stringify(res.data[0]));

        navigate("/product"); // go to product page
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div style={{ width: "300px", margin: "auto" }}>
      {/* <h2 style={{ textAlign: "center" }}>Login</h2> */}

   <div className="login-container">
  <form onSubmit={handleSubmit} className="login-box">
    <h2>Login </h2>

    <label>Email</label>
    <input
      type="email"
      name="email"
      placeholder="Enter your email"
      onChange={handleChange}
      required
    />

    <label>Password</label>
    <input
      type="password"
      name="password"
      placeholder="Enter your password"
      onChange={handleChange}
      required
    />

    <button type="submit">Login</button>

    <p className="signup-text">
      New to Website? <Link to="/signup">Create your account</Link>
    </p>
  </form>
</div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import './signup.css'

const Signup = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      // check if user already exists
      const res = await axios.get(
        `http://localhost:8080/users?email=${user.email}`
      );

      if (res.data.length > 0) {
        alert("User already exists!");
        return;
      }

      await axios.post("http://localhost:4000/users", user);

      alert("Signup successful!");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div style={{ width: "300px", margin: "auto" }}>
      {/* <h2>Signup</h2> */}
   <div className="signup-container">
  <form onSubmit={handleSubmit} className="signup-box">
    <h2>Create account</h2>

    <label>Name</label>
    <input
      type="text"
      name="name"
      placeholder="Enter your name"
      onChange={handleChange}
      required
    />

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

    <button type="submit">Create your account</button>

    <p className="login-text">
      Already have an account? <Link to="/login">Login</Link>
    </p>
  </form>
</div>
    </div>
  );
};

export default Signup;
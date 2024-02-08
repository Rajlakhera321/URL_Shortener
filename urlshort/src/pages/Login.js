import React, { useState } from "react";
import "../css/Login.css";
import email from "../assests/email.png";
import password from "../assests/password.png";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const navigation = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://url-shortener-p22z.onrender.com/app/v1/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      }
    );
    const json = await response.json();
    if(json.message === "Email doesn't exists"){
      alert("Email doesn't exists. If new user then Signup");
      return;
    }
    if (json.message === "Login Successfully") {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("userId", json.user._id);
      localStorage.setItem("userName", json.user.name);
      localStorage.setItem("authToken", json.token);
      alert("login successs");
      navigate("/home");
    } else alert("Enter correct password");
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  return (
    <div className="container">
      <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={email} alt="" />
          <input type="email" placeholder="Email" name="email" value={credentials.email} onChange={onChange}/>
        </div>
        <div className="input">
          <img src={password} alt="" />
          <input type="password" placeholder="Password" name="password" value={credentials.password} onChange={onChange}/>
        </div>
      </div>
      <div className="forget-password">
        New User? <span onClick={navigation}>Click Here!</span>
      </div>
      <div className="submit-container">
        <button className="submit" onClick={handleSubmit}>Login</button>
      </div>
    </div>
  );
}

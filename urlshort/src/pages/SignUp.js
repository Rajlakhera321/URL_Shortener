import React, { useState } from "react";
import "../css/Login.css";
import person from "../assests/person.png";
import email from "../assests/email.png";
import password from "../assests/password.png";
import { useNavigate } from "react-router-dom";
import Background from "../components/Background";

export default function Login() {
  const navigate = useNavigate();
  function loginNavigate()  {
    navigate('/login');
  }
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(credentials.name === ""){
      alert("Enter Name");
      return;
    }else if(credentials.email === ""){
      alert("Enter email");
      return;
    }else if(credentials.password === ""){
      alert("Enter password");
      return;
    }
    const response = await fetch(
      "https://friendly-space-zebra-444g94vw9rfqxq9-3030.app.github.dev/app/v1/add",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        }),
      }
    );
    const json = await response.json();
    if(json.errors){
      alert(json.errors[0].undefined);
      return;
    }

    if (json.message === "Internal Server Error") {
      alert("Enter valid credentails");
    } else {
        navigate("/login");
        alert("Registered successfully")
    };
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Sign Up</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={person} alt="" />
          <input type="text" placeholder="Name" name="name" value={credentials.name} onChange={onChange}/>
        </div>
        <div className="input">
          <img src={email} alt="" />
          <input type="email" placeholder="Email" name="email" value={credentials.email} onChange={onChange}/>
        </div>
        <div className="input">
          <img src={password} alt="" />
          <input type="password" placeholder="Password" name="password" value={credentials.password} onChange={onChange} />
        </div>
      </div>
      <div className="forget-password">
        Existing user? <span onClick={loginNavigate}>Click Here!</span>
      </div>
      <div className="submit-container">
        <button className="submit" type="submit" onClick={handleSubmit}>Sign Up</button>
      </div>
      <Background />
    </div>
  );
}

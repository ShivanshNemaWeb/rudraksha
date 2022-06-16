import React, { useState } from "react";
import "./LoginPage.css";
import { useHistory } from "react-router-dom";
import Interview from "../Interview/Interview";

function LoginLogin() {
  let history = useHistory();

  // React States
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [successMsg, setSuccessMsg] = useState("");

  const handleEmailChange = (e) => {
    setSuccessMsg("");
    setEmailError("");
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setSuccessMsg("");
    setPasswordError("");
    setPassword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (email !== "") {
      // const emailRegex=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      // if(emailRegex.test(email)){
      //   setEmailError('');
      if (email === "admin") {
        setEmailError("");
        if (password === "RUDRAKSHA") {
          setPasswordError("");
          setSuccessMsg("You are successfully logged in");
          console.log("working");
          history.push("/interview");
        } else {
          setPasswordError("Password does not match with email address");
        }
      } else {
        setEmailError("email doest not match");
      }
      // }else{
      //   setEmailError('Invalid Email')
      // }
    } else {
      setEmailError("Email Required");
    }
    if (password !== "") {
    } else {
      setPasswordError("Password Required");
    }
  };
  return (
    <div className="BodyLogin">
      <div className="NavLogin">
        <img src={require("../../Images/RWFLOGO.png")} />
        <h2>Interview Login</h2>
      </div>
      <div className="MainLogin">
        <form onSubmit={handleFormSubmit}>
          <div className="UserLogin">
            <img src={require("../../Images/email.png")} />
            <input
              type="text"
              className="form-control"
              name="uname"
              id="userLogin"
              aria-describedby="emailHelp"
              placeholder="Username"
              onChange={handleEmailChange}
              value={email}
            />

            {emailError && <div className="error-msg">{emailError}</div>}
          </div>
          <div className="PwdLogin">
            <img src={require("../../Images/lock.png")} />
            <input
              type="password"
              className="form-control"
              name="pass"
              id="pwdLogin"
              placeholder="Password"
              onChange={handlePasswordChange}
              value={password}
            />
            {passwordError && <div className="error-msg">{passwordError}</div>}
          </div>

          <div className="RemLogin">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Remember Me
            </label>
          </div>

          <div className="btnLogin">
            <button type="submit" className="btn btn-primary">
              <span>Login</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginLogin;

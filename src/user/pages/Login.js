import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import login from "./login.png";

const Login = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
    } catch (err) {
      console.log("err", err);
    }
  };

  // after submitting the form redirect to /users
  const navigate = useNavigate();
  const RedirecToHome = () => {
    setTimeout(() => {
      navigate("/users");
    }, 2000);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="grid-container__auth">
      <div className="grid-left__auth" id="login">
        <img src={login} alt="register" />
      </div>

      <div className="grid-right__auth ">
        <br />
        <br />

        <form onSubmit={handleSubmit} className="form__auth">
          <h1>Log in to your account</h1>

          <input
            className="input__auth input-field"
            value={email}
            name="email"
            id="email"
            placeholder="email@email.com"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <br />
          <br />

          <input
            className="input__auth input-field"
            value={password}
            name="password"
            id="password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>

          <br />
          <br />

          <button
            onClick={RedirecToHome}
            className="btn--auth"
            id="register"
            type="submit"
          >
            Login
          </button>

          <br />
          <br />
        </form>

        <div className="login-user">
          <hr />
          <p>Don't have an account?</p>
          <Link id="create-href" to="/register">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

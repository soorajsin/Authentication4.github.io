import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [inpVal, setInpVal] = useState({
    email: "",
    password: "",
  });

  const setVal = (e) => {
    const { name, value } = e.target;

    setInpVal({
      ...inpVal,
      [name]: value,
    });
  };
  console.log(inpVal);

  const loginUser = async (e) => {
    e.preventDefault();

    const { email, password } = inpVal;

    if (email === "") {
      alert("Please enter your Email");
    } else if (!email.includes("@")) {
      alert("Email is not valid");
    } else if (password === "") {
      alert("Please enter your Password");
    } else if (password.length < 6) {
      alert("Password must be at least six characters long");
    } else {
      console.log("login");

      const data = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const res = await data.json();
      console.log(res);

      if (res.status === 201) {
        alert("User Login Successfully done");
        localStorage.setItem("userdataToken", res.result.token);
        setInpVal({ ...inpVal, email: "", password: "" });
      }
    }
  };

  return (
    <>
      <div className="register">
        <h1>Welcome to Login</h1>
        <br />
        <div className="form">
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            name="email"
            value={inpVal.email}
            onChange={setVal}
            placeholder="Enter here..."
          />
        </div>
        <br />
        <div className="form">
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            name="password"
            value={inpVal.password}
            onChange={setVal}
            placeholder="Enter here..."
          />
        </div>
        <br />
        <div className="form">
          <button onClick={loginUser}>Login</button>
        </div>
        <br />
        <div className="form">
          <p>
            Don't have an account? <NavLink to={"/"}>Register</NavLink>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;

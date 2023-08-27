import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Register = () => {
  const [inpVal, setInpVal] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const setVal = (e) => {
    const { name, value } = e.target;

    setInpVal({
      ...inpVal,
      [name]: value,
    });
  };
  console.log(inpVal);

  const registerUser = async (e) => {
    e.preventDefault();

    const { name, email, password, cpassword } = inpVal;

    if (name === "") {
      alert("Please enter your Name");
    } else if (email === "") {
      alert("Please enter your Email Address");
    } else if (!email.includes("@")) {
      alert("Invalid Email Address");
    } else if (password === "") {
      alert("Please enter a Password");
    } else if (password.length < 6) {
      alert("Password must be at least six characters long.");
    } else if (cpassword === "") {
      alert(
        "Please confirm the password you entered above by typing it again here."
      );
    } else if (cpassword.length < 6) {
      alert("Confirmed password must be at least six characters long.");
    } else if (password !== cpassword) {
      alert("Passwords do not match.");
    } else {
      console.log("register");

      const data = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, cpassword }),
      });

      const res = await data.json();
      console.log(res);

      if (res.status === 201) {
        alert("Account Created Successfully!");
        setInpVal({ ...inpVal, name: "", email: "", password: "", cpassword });
      }
    }
  };

  return (
    <>
      <div className="register">
        <h1>Welcome to Register</h1>
        <br />
        <div className="form">
          <label htmlFor="name">Name</label>
          <br />
          <input
            type="text"
            name="name"
            value={inpVal.name}
            onChange={setVal}
            placeholder="Enter here..."
          />
        </div>
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
          <label htmlFor="cpassword">Confirm Password</label>
          <br />
          <input
            type="password"
            name="cpassword"
            value={inpVal.cpassword}
            onChange={setVal}
            placeholder="Enter here..."
          />
        </div>
        <br />
        <div className="form">
          <button onClick={registerUser}>Register</button>
        </div>
        <br />
        <div className="form">
          <p>
            Already have an account? <NavLink to={"/login"}>Login</NavLink>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;

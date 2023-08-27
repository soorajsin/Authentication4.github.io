import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ContextNavigate } from "./ContextProvider/Context";

const Dashboard = () => {
  const { userdata, setUserData } = useContext(ContextNavigate);
  // console.log(userdata.getData.email);

  const history = useNavigate();

  const fetchdatafromlogin = async () => {
    const token = localStorage.getItem("userdataToken");
    // console.log(token);

    const data = await fetch("http://localhost:4000/validate", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const res = await data.json();
    //     console.log("res  " + res);

    if (res.status === 422 || !res) {
      console.log("error");
      history("*");
    } else {
      //       console.log("success");
      //   console.log(res);
      setUserData(res);
      history("/dash");
    }
  };

  useEffect(() => {
    fetchdatafromlogin();
  });

  return (
    <>
      <div className="dash">
        <h1>DASHBOARD</h1>
        <br />
        <div className="email" style={{ color: "red" }}>
          <h1>User Id: {userdata ? userdata.getData.email : ""}</h1>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

import React, { useEffect } from "react";

const Dashboard = () => {
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
    } else {
      console.log("success");
      console.log(res);
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
        User Id: soorajsingh7505@gmail.com
      </div>
    </>
  );
};

export default Dashboard;

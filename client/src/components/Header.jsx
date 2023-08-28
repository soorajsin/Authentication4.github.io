import React, { useContext } from "react";
import { AppBar, Toolbar, Avatar } from "@mui/material";
import { ContextNavigate } from "./ContextProvider/Context";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const history = useNavigate();

  const { userdata } = useContext(ContextNavigate);
  //     console.log(userdata);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //   const logoutuser = async () => {
  //     const token = localStorage.getItem("userdataToken");
  //     // console.log(token);

  //     const data = await fetch("http://localhost:4000/logout", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: token,
  //         Accept: "application/json",
  //       },
  //       credentials: "include",
  //     });

  //     const res = await data.json();
  //     //console.log("res  " + res);

  //     if (res.status === 201) {
  //       //       console.log("error");
  //       console.log("user logout");
  //       localStorage.removeItem("userdataToken");
  //       //   console.log(res);
  //       setUserData(false);
  //       history("/");
  //     } else {
  //       // console.log("user logout");
  //       // localStorage.removeItem("userdataToken");
  //       // //   console.log(res);
  //       // setUserData(false);
  //       // history("/");
  //       console.log("error");
  //     }
  //   };

  const goError = () => {
    history("*");
  };

  const goDash = () => {
    history("/dash");
  };

  return (
    <>
      <div className="header">
        <AppBar position="static">
          <Toolbar>
            <div className="avtar">
              {userdata.getData ? (
                <Avatar
                  style={{
                    background: "salmon",
                    fontWeight: "bold",
                    textTransform: "capitalize",
                  }}
                  onClick={handleClick}
                >
                  {userdata.getData.name[0].toUpperCase()}
                </Avatar>
              ) : (
                <Avatar onClick={handleClick} />
              )}
              {/* <Avatar>
                {userdata ? userdata.getData.name[0].toUpperCase() : ""}
              </Avatar> */}
            </div>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {userdata.getData ? (
                <>
                  <MenuItem
                    onClick={() => {
                      goDash();
                      handleClose();
                    }}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      //logoutuser();
                      handleClose();
                    }}
                  >
                    Logout
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem
                    onClick={() => {
                      goError();
                      handleClose();
                    }}
                  >
                    Profile
                  </MenuItem>
                </>
              )}
            </Menu>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};

export default Header;

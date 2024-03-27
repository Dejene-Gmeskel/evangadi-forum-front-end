
import React, { useContext, useEffect, useState } from "react";
import classes from "./header.module.css";
import { Link } from "react-router-dom";
import logo from "../images/logo0.png";
import { UserContext } from "../Dataprovider/DataProvider";
//import login from "../../pages/login/login";

function Header() {
  const [userData, setUserData] = useContext(UserContext);
  //console.log(userData)
  // const navigate = useNavigate();
  const [isLogin, setLogin] = useState(true);
  const headerStyle = {
    position: "sticky",
    top: 0,
    zIndex: 10,
    boxShadow: "0px 3px 3px 0px rgba(0, 0, 0, 0.3)",  
  };

  // console.log(token)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLogin(isLogin);
    } else {
      setLogin(!isLogin);
    }
  }, []);

  async function logout() {
    //set global state to undefined will logout the user
    localStorage.removeItem("token");
    setUserData(null);
  }

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary header py-4"
      style={headerStyle}
      bg="light"
      expand="lg"
    >
      <div className="container-fluid">
        <div className={classes.logo_container}>
           
          {isLogin ? (
            <Link
              to="/home"
              className="nav-link active"
              aria-current="page"
              href="#"
            >
            <img src={logo} alt="Logo" />
            </Link>
          ) : (
            <Link
              to="/login"
              className="nav-link active"
              aria-current="page"
              href="#"
            >
              <img src={logo} alt="Logo" />
            </Link>
          )}
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item link">
              {isLogin ? (
                <Link
                  to="/home"
                  className=" nav-link active link"
                  aria-current="page"
                  href="#"
                >
                  Home
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="nav-link active"
                  
                  aria-current="page"
                  href="#"
                >
                  Home
                </Link>
              )}
            </li>
            <li className="nav-item link">
              <a className="nav-link " href="#">
                How it Works
              </a>
            </li>
            <div className={classes.connect_block}>
              <button>
                <Link
                  className={classes.btn_blue}
                  data-panel=".panel-login"
                  to="/login"
                  onClick={logout}
                >
                  {userData?.userid ? `Log Out` : `Sign In`}
                </Link>
              </button>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Header;

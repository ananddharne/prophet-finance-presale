import React from "react";
import logo from "./logo.svg";
import "./Navbar.css";
import metamaskLogo from "./metamaskLogo.svg";
import { Button } from "antd";
import { NONAME } from "dns";

const Navbar = ({ account }) => {
  return (
    <nav className="navbar">
      <a href="/">
        <img src={logo} className="logo-navbar" />{" "}
      </a>
      {/* <p className="navbar-brand my-auto">react website</p> */}
      <ul className="navbar-nav">
        <Button
          // onClick={walletAddress}
          type="primary"
          shape="round"
          style={{
            background: "linear-gradient(to right, #ff756d, #ff1a60)",
            width: "8em",
            marginRight: "1.5em",
            color: "white",
            borderRadius: "1em",
            outline: "none",
            border: 'none'
          }}
          size={"small"}
        >
          <div
            style={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis"
            }}
          >
            <img
              src={metamaskLogo}
              style={{ height: "1em"}}
              className="mm-logo"
              alt="logo"
            />{" "}
            {account === "" ? "Connect" : account}
          </div>
        </Button>
        {/* <li className="nav-item text-white">{account}</li> */}
      </ul>
    </nav>
  );
};

export default Navbar;

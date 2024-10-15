import "../assets/css/header.css";
import "../assets/css/app.css";
import { useState } from "react";
import { ReactComponent as Hamburger } from "../assets/svg/burger.svg";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [curtain, setCurtain] = useState();
  const { user, login, logout } = useAuth();

  if (window.location.href === `${window.location.origin}/game`) return <></>;

  const redirect = (to) => {
    setCurtain();
    navigate(`/${to}`);
  };

  return (
    <>
      <div className="header-wrapper">
        <div className="header">
          {user && (
            <div
              className="hamburger-wrapper first-hamburger"
              onClick={() => setCurtain((prev) => !prev)}
            >
              <Hamburger />
            </div>
          )}
          <div className="logo-wrapper madimi-one-regular">Checkers Rosvat</div>

          <div className="side-bar">
            {user && (
              <nav>
                <div onClick={() => redirect("")}>Home</div>

                <div onClick={() => redirect("history")}>Match history</div>
              </nav>
            )}
            {user ? (
              <div className="image-container" onClick={logout}>
                <img src={user.picture} />
                <div className="overlay">
                  <span>Log out</span>
                </div>
              </div>
            ) : (
              <div className="login-wrapper">
                <div className="custom-btn">
                  <input value="Log in" type="button" onClick={login} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={"nav " + (curtain ? " curtain" : "")}>
        <div onClick={() => redirect("")}>Home</div>
        <div onClick={() => redirect("history")}>Match history</div>
      </div>
    </>
  );
}

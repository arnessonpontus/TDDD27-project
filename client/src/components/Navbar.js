import React, { useState } from "react";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img src="./images/first-draft-logo.png" alt="No-img" />
        </a>
        <a
          href="/#"
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={toggleNav}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div
        id="navbarBasicExample"
        className={isNavOpen ? "navbar-menu is-active" : "navbar-menu"}
      >
        <div className="navbar-start">
          <a href="/" className="navbar-item">
            Home
          </a>

          <a href="/" className="navbar-item">
            How to play
          </a>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a href="/" className="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a href="/" className="button is-light">
                Log in
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;

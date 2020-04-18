import React, { useState } from "react";
import { connect } from "react-redux";
import RegisterModal from "./auth/RegisterModal";
import { clearErrors } from "../actions/errorActions";
import { logout } from "../actions/authActions";
import propTypes from "prop-types";

const Navbar = (props) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const toggleRegModal = () => {
    props.clearErrors();
    setIsRegModalOpen(!isRegModalOpen);
  };

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="#">
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
              <a
                href="#"
                className="button is-primary"
                onClick={toggleRegModal}
              >
                <strong>Sign up</strong>
              </a>
              <a href="#" className="button is-light" onClick={props.logout}>
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
      <RegisterModal
        isRegModalOpen={isRegModalOpen}
        toggleRegModal={toggleRegModal}
      />
    </nav>
  );
};

const mapStateToProps = (state) => ({});

Navbar.propTypes = {
  clearErrors: propTypes.func.isRequired,
  logout: propTypes.func.isRequired,
};

export default connect(mapStateToProps, { clearErrors, logout })(Navbar);

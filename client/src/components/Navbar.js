import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import RegisterModal from "./auth/RegisterModal";
import LoginModal from "./auth/LoginModal";
import { clearErrors } from "../actions/errorActions";
import { logout } from "../actions/authActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const toggleRegModal = () => {
    props.clearErrors();
    setIsRegModalOpen(!isRegModalOpen);
  };

  const toggleLoginModal = () => {
    props.clearErrors();
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  const { isAuthenticated, user } = props.auth;

  const authLinks = (
    <a href="#/" className="button is-light" onClick={props.logout}>
      Logout
    </a>
  );

  const guestLinks = (
    <Fragment>
      <a href="#/" className="button is-primary" onClick={toggleRegModal}>
        <strong>Register</strong>
      </a>
      <a href="#/" className="button is-light" onClick={toggleLoginModal}>
        <strong>Login</strong>
      </a>
    </Fragment>
  );

  return (
    <nav
      className="navbar nav-margin-bot"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <img src="./images/first-draft-logo.png" alt="No-img" />
        </Link>
        <a
          href="#/"
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar"
          onClick={toggleNav}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div
        id="navbar"
        className={isNavOpen ? "navbar-menu is-active" : "navbar-menu"}
      >
        <div className="navbar-start">
          <Link to="/" className="navbar-item">
            Home
          </Link>

          <Link to="/howtoplay" className="navbar-item">
            How to play
          </Link>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <strong className="navbar-item">
              {user ? `Welcome ${user.name}` : ""}
            </strong>
            <div className="buttons">
              {isAuthenticated ? authLinks : guestLinks}
            </div>
          </div>
        </div>
      </div>
      <RegisterModal
        isRegModalOpen={isRegModalOpen}
        toggleRegModal={toggleRegModal}
      />
      <LoginModal
        isLoginModalOpen={isLoginModalOpen}
        toggleLoginModal={toggleLoginModal}
      />
    </nav>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

Navbar.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { clearErrors, logout })(Navbar);

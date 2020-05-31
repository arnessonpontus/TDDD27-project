import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { login } from "../../actions/authActions";

const LoginModal = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);

  // Instead of component did update
  useEffect(() => {
    if (props.error.id === "LOGIN_FAIL") {
      setMsg(props.error.msg.msg);
    } else {
      setMsg(null);
    }
    // If authenticated, close modal
    if (props.isLoginModalOpen) {
      if (props.isAuthenticated) {
        props.toggleLoginModal();
      }
    }
  }, [props.error, props.isAuthenticated]);

  if (!props.isLoginModalOpen) return null;

  const onSubmit = (e) => {
    e.preventDefault();

    // Create user object
    const user = {
      email,
      password,
    };

    // Attempt to login
    props.login(user);
  };

  // Could maybe refactor
  const onChange = (e) => {
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
        return;
    }
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={props.toggleLoginModal}></div>
      <div className="modal-card">
        <header className="modal-card-head has-text-centered">
          <p className="modal-card-title">Login</p>
          <button className="delete" onClick={props.toggleLoginModal} />
        </header>
        <div className="modal-card-body">
          {msg ? <div className="notification is-danger">{msg}</div> : null}
          <form onSubmit={onSubmit}>
            <div className="field">
              <label className="label">Email</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  autoFocus
                  name="email"
                  className="input"
                  type="email"
                  placeholder="Email"
                  onChange={onChange}
                  value={email}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </div>
            </div>

            <div className="field">
              <label className="label">Password</label>
              <div className="control has-icons-left">
                <input
                  name="password"
                  className="input"
                  type="password"
                  placeholder="Password"
                  onChange={onChange}
                  value={password}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </div>
            </div>

            <div className="field">
              <p className="control">
                <button className="button is-success">Login</button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

LoginModal.propTypes = {
  isAuthenticated: propTypes.bool,
  error: propTypes.object.isRequired,
  login: propTypes.func.isRequired,
};

export default connect(mapStateToProps, { login })(LoginModal);

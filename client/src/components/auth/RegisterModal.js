import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { register } from "../../actions/authActions";

const RegisterModal = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);

  // Instead of component did update
  useEffect(() => {
    if (props.error.id === "REGISTER_FAIL") {
      setMsg(props.error.msg.msg);
    } else {
      setMsg(null);
    }

    // If authenticated, close modal
    if (props.isRegModalOpen) {
      if (props.isAuthenticated) {
        props.toggleRegModal();
      }
    }
  }, [props.error, props.isAuthenticated]);

  if (!props.isRegModalOpen) return null;

  const onSubmit = (e) => {
    e.preventDefault();

    // Create user object
    const newUser = {
      name,
      email,
      password,
    };

    // Attempt to register
    props.register(newUser);
  };

  // Could maybe refactor
  const onChange = (e) => {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
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
      <div className="modal-background" onClick={props.toggleRegModal}></div>
      <div className="modal-card">
        <header className="modal-card-head has-text-centered">
          <p className="modal-card-title">Register</p>
          <button className="delete" onClick={props.toggleRegModal} />
        </header>
        <div className="modal-card-body">
          {msg ? <div className="notification is-danger">{msg}</div> : null}
          <form onSubmit={onSubmit}>
            <div className="field">
              <label className="label">Username</label>
              <p className="control has-icons-left">
                <input
                  autoFocus
                  name="name"
                  className="input"
                  type="text"
                  placeholder="name"
                  onChange={onChange}
                  value={name}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user"></i>
                </span>
              </p>
            </div>

            <div className="field">
              <label className="label">Email</label>
              <div className="control has-icons-left has-icons-right">
                <input
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
                <span className="icon is-small is-right">
                  <i className="fas fa-check"></i>
                </span>
              </div>
            </div>

            <div className="field">
              <label className="label">Password</label>
              <p className="control has-icons-left">
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
              </p>
            </div>

            <div className="field">
              <p className="control">
                <button className="button is-success">Register</button>
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

RegisterModal.propTypes = {
  isAuthenticated: propTypes.bool,
  error: propTypes.object.isRequired,
  register: propTypes.func.isRequired,
};

export default connect(mapStateToProps, { register })(RegisterModal);

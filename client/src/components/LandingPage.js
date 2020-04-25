import React from "react";
import UserWordList from "./UserWordList";
import UserView from "./UserView";
import GuestView from "./GuestView";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const LandingPage = (props) => {
  const { user } = props.auth;
  return (
    <div>
      <h1 className="title is-1">Welcome to Doodla</h1>
      {user ? <UserView /> : <GuestView />}
    </div>
  );
};

UserWordList.propTypes = {
  auth: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(LandingPage);

import React, { Fragment } from "react";
import UserWordList from "./UserWordList";
import UserView from "./UserView";
import GuestView from "./GuestView";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const LandingPage = (props) => {
  const { user } = props.auth;
  return <Fragment>{user ? <UserView /> : <GuestView />}</Fragment>;
};

UserWordList.propTypes = {
  auth: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(LandingPage);

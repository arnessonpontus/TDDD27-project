import React from "react";
import WordList from "./WordList";
import UserWordList from "./UserWordList";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const LandingPage = (props) => {
  const { user } = props.auth;
  return (
    <div>
      <h1 className="title is-1">Welcome to Doodla</h1>
      <WordList />
      <br></br>
      <br></br>
      {user ? <UserWordList /> : null}
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

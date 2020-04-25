import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getUserWords, deleteWord } from "../actions/wordActions";
import Adder from "./Adder";
import PropTypes from "prop-types";

const UserWordList = (props) => {
  const { user } = props.auth;

  useEffect(() => {
    props.getUserWords(user.words);
  }, [props.auth]);

  const onDeleteClick = (id) => {
    props.deleteWord(id);
  };

  const { userWords } = props.word;

  return (
    <div>
      <h1>USER WORDS</h1>
      <Adder />
      <div style={{ backgroundColor: "lightgray" }}>
        {userWords.map(({ _id, name }) => (
          <div key={_id}>
            <p>{name}</p>
            <button className="is-small" onClick={() => onDeleteClick(_id)}>
              delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// To Check the intended types of properties passed to components
UserWordList.propTypes = {
  getUserWords: PropTypes.func.isRequired,
  word: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  word: state.word, // Get the word reducer from combine reducers
  auth: state.auth,
});

export default connect(mapStateToProps, { getUserWords, deleteWord })(
  UserWordList
);

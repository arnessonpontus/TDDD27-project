import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getUserWords, deleteWord } from "../actions/wordActions";
import Adder from "./Adder";
import PropTypes from "prop-types";

const UserWordList = (props) => {
  const { user } = props.auth;

  useEffect(() => {
    props.getUserWords(user._id);
  }, [props.auth.user]);

  const onDeleteClick = (id) => {
    props.deleteWord(id);
  };

  const { userWords } = props.word;

  return (
    <div>
      <div className="tile is-primary">
        <article className="tile is-child notification is-primary is-3">
          <p className="title">Your added words</p>
          {userWords.map(({ _id, name }) => (
            <div key={_id} className="field is-grouped">
              <div className="control">
                <p className="subtitle">{name}</p>
              </div>
              <div
                className="control"
                onClick={() => {
                  console.log("click");
                  onDeleteClick(_id);
                }}
              >
                <i
                  style={{ cursor: "pointer" }}
                  className="fas fa-trash is-medium"
                ></i>
              </div>
            </div>
          ))}
          <Adder />
        </article>
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

import React, { useState } from "react";
import { connect } from "react-redux";
import { addWord } from "../actions/wordActions";

const Adder = (props) => {
  const { user } = props.auth;
  const [wordName, setWordName] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    const newWord = { name: wordName, userID: user._id };

    // Add word via add word action
    props.addWord(newWord);
    setWordName("");
  };

  const onChange = (e) => {
    setWordName(e.target.value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="field has-addons">
          <p className="control">
            <input
              className="input"
              type="text"
              name="name"
              value={wordName}
              placeholder="Guitar"
              onChange={onChange}
            ></input>
          </p>
          <p className="control">
            <button className="button">Add word</button>
          </p>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({ word: state.word, auth: state.auth });

export default connect(mapStateToProps, { addWord })(Adder);

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
        <div class="field has-addons">
          <p class="control">
            <input
              className="input"
              type="text"
              name="name"
              value={wordName}
              placeholder="Guitar"
              onChange={onChange}
            ></input>
          </p>
          <p class="control">
            <button class="button">Add word</button>
          </p>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({ word: state.word, auth: state.auth });

export default connect(mapStateToProps, { addWord })(Adder);

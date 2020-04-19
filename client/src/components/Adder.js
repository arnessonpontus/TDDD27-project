import React, { useState } from "react";
import { connect } from "react-redux";
import { addWord } from "../actions/wordActions";

const Adder = (props) => {
  const [wordName, setWordName] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    const newWord = { name: wordName };

    // Add word via add word action
    props.addWord(newWord);
  };

  const onChange = (e) => {
    setWordName(e.target.value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="field">
          <input
            type="text"
            name="name"
            placeholder="Add"
            onChange={onChange}
          ></input>
        </div>
        <button className="button is-medium">Add word</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({ word: state.word });

export default connect(mapStateToProps, { addWord })(Adder);

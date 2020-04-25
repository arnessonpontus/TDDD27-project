import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllWords } from "../actions/wordActions";
import PropTypes from "prop-types";

const WordList = (props) => {
  useEffect(() => {
    props.getAllWords();
  }, []);

  const onDeleteClick = (id) => {
    props.deleteWord(id);
  };

  const { allWords } = props.word;
  return (
    <div>
      <h1>ALL WORDS</h1>
      <div style={{ backgroundColor: "lightgray" }}>
        {allWords.map(({ _id, name }) => (
          <div key={_id}>
            <p>{name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// To Check the intended types of properties passed to components
WordList.propTypes = {
  getAllWords: PropTypes.func.isRequired,
  word: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  word: state.word, // Get the word reducer from combine reducers
});

export default connect(mapStateToProps, { getAllWords })(WordList);

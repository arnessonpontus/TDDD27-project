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
    <div className="tile is-primary">
      <article className="tile is-child notification is-primary is-4">
        <p className="title">All words</p>
        {allWords.map(({ _id, name }) => (
          <div key={_id}>
            <p className="subtitle">{name}</p>
          </div>
        ))}
      </article>
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

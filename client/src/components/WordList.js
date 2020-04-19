import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getWords, deleteWord } from "../actions/wordActions";
import Adder from "./Adder";
import PropTypes from "prop-types";

const WordList = (props) => {
  useEffect(() => {
    props.getWords();
  }, []);

  const onDeleteClick = (id) => {
    props.deleteWord(id);
  };

  const { words } = props.word;
  return (
    <div>
      <Adder />
      <div>
        {words.map(({ _id, name }) => (
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
WordList.propTypes = {
  getWords: PropTypes.func.isRequired,
  word: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  word: state.word,
});

export default connect(mapStateToProps, { getWords, deleteWord })(WordList);

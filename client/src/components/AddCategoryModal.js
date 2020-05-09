import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addWord } from "../actions/wordActions";
import propTypes from "prop-types";

const AddCategoryModal = (props) => {
  const [msg, setMsg] = useState(null);

  const { loading } = props.word;

  // Instead of component did update
  useEffect(() => {
    if (props.error.id === "ADD_WORD_FAIL") {
      setMsg(props.error.msg.msg);
    } else {
      setMsg(null);
    }
    if (props.isCategoryModalOpen) {
      if (!loading) {
        props.toggleCategoryModal();
      }
    }
  }, [props.error, loading]);

  if (!props.isCategoryModalOpen) return null;

  const { user } = props.auth;
  const chooseCategory = (category) => {
    const newWord = {
      name: props.wordName,
      userID: user._id,
      category: category,
    };

    // Add word via add word action
    props.addWord(newWord);
    props.setWordName("");
  };

  return (
    <div className="modal is-active">
      <div
        className="modal-background"
        onClick={props.toggleCategoryModal}
      ></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Choose category</p>
          <button className="delete" onClick={props.toggleCategoryModal} />
        </header>
        <div className="modal-card-body ">
          {msg ? <div className="notification is-danger">{msg}</div> : null}
          <div className="buttons column">
            <button
              className="button "
              onClick={() => chooseCategory("object")}
            >
              <span className="icon">
                <i className="fas fa-bicycle  "></i>
              </span>
              {"  "}
              <span>Object</span>
            </button>
            <button
              className="button  "
              onClick={() => chooseCategory("action")}
            >
              <span className="icon">
                <i className="fas fa-swimmer  "></i>
              </span>
              {"  "}
              <span>Action</span>
            </button>
            <button className="button" onClick={() => chooseCategory("person")}>
              <span className="icon">
                <i className="fas fa-male"></i>
              </span>
              {"  "}
              <span>Person/Character</span>
            </button>
            <button className="button" onClick={() => chooseCategory("animal")}>
              <span className="icon">
                <i className="fas fa-frog"></i>
              </span>
              {"  "}
              <span>Animal</span>
            </button>
            <button className="button" onClick={() => chooseCategory("other")}>
              <span className="icon">
                <i className="fas fa-question"></i>
              </span>
              {"  "}
              <span>Other</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

AddCategoryModal.propTypes = {
  auth: propTypes.object.isRequired,
  error: propTypes.object.isRequired,
  word: propTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
  word: state.word,
});

export default connect(mapStateToProps, { addWord })(AddCategoryModal);

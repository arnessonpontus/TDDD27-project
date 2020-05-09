import React, { useState } from "react";
import { connect } from "react-redux";
import { addWord, setWordsLoading } from "../actions/wordActions";
import AddCategoryModal from "./AddCategoryModal";
import { clearErrors } from "../actions/errorActions";
import propTypes from "prop-types";

const Adder = (props) => {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const [wordName, setWordName] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    if (wordName !== "") {
      props.setWordsLoading(true);
      toggleCategoryModal();
    }
  };

  const toggleCategoryModal = () => {
    props.clearErrors();

    //Set word to loading if category modal is open
    if (wordName === "") props.setWordsLoading(false);
    setIsCategoryModalOpen(!isCategoryModalOpen);
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
      <AddCategoryModal
        wordName={wordName}
        setWordName={setWordName}
        isCategoryModalOpen={isCategoryModalOpen}
        toggleCategoryModal={toggleCategoryModal}
      />
    </div>
  );
};

AddCategoryModal.propTypes = {
  clearErrors: propTypes.func,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  addWord,
  setWordsLoading,
  clearErrors,
})(Adder);

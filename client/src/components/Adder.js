import React, { useState } from "react";
import { connect } from "react-redux";
import { addItem } from "../actions/itemActions";

const Adder = (props) => {
  const [itemName, setItemName] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    const newItem = { name: itemName };

    // Add item via add item action
    props.addItem(newItem);
  };

  const onChange = (e) => {
    setItemName(e.target.value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Add"
          onChange={onChange}
        ></input>
        <button className="button is-medium">Redux</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({ item: state.item });

export default connect(mapStateToProps, { addItem })(Adder);

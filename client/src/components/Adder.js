import React, { useState } from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addItem } from "../actions/itemActions";

const Adder = (props) => {
  const [itemName, setItemName] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(itemName);
    const newItem = { id: uuidv4(), name: itemName };

    // Add item via add item action
    props.addItem(newItem);
    setItemName("");
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

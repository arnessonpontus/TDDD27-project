import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/itemActions";
import Adder from "./Adder";
import PropTypes from "prop-types";

const ItemList = (props) => {
  useEffect(() => {
    props.getItems();
  }, []);

  const onDeleteClick = (id) => {
    props.deleteItem(id);
  };

  const { items } = props.item;
  return (
    <div>
      <Adder />
      <div>
        {items.map(({ id, name }) => (
          <div key={id}>
            <p>{name}</p>
            <button className="is-small" onClick={() => onDeleteClick(id)}>
              delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// To Check the intended types of properties passed to components
ItemList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  item: state.item,
});

export default connect(mapStateToProps, { getItems, deleteItem })(ItemList);

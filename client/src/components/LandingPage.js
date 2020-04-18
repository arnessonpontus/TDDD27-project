import React from "react";
import ItemList from "./ItemList";

const LandingPage = (props) => {
  return (
    <div>
      <h1 className="title is-1">Hello TDDD27</h1>
      <ItemList />
    </div>
  );
};

//const mapStateToProps = (state) => ({ item: state.item });

export default LandingPage;

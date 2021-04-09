import React from "react";
import "./ListItem.scss";

const ListItem = ({ path, index, setCheckedPaths, checkedPaths }) => {
  const checkTest = (event) => {
    if (event.target.checked) {
      setCheckedPaths((el) => [...el, path]);
    } else {
      setCheckedPaths(checkedPaths.filter((el) => el !== path));
    }
  };

  return (
    <div className="list_item_wrap">
      <label className="container">
        Polygon{index}
        <input type="checkbox" onClick={checkTest}></input>
        <span className="checkmark"></span>
      </label>
    </div>
  );
};

export default ListItem;

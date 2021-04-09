import React from "react";
import "./List.scss";
import ListItem from "./listItem/ListItem";
import Button from "./button/Button";

const List = ({
  paths,
  setCheckedPaths,
  checkedPaths,
  exportAll,
  mergePolygon,
}) => {
  const renderList = () => {
    if (!paths) {
      return null;
    } else {
      return paths.map((path, index) => {
        return (
          <ListItem
            path={path}
            key={index}
            index={index}
            setCheckedPaths={setCheckedPaths}
            checkedPaths={checkedPaths}
          />
        );
      });
    }
  };

  return (
    <div className="list_wrap">
      <div className="items_container">{renderList()}</div>
      <div className="btn_container">
        <Button name="export" clickHandler={exportAll} />
        <Button name="merge" clickHandler={mergePolygon} />
      </div>
    </div>
  );
};

export default List;

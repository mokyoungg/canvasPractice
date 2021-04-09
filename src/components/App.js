import React, { useState } from "react";
import "./App.scss";
import Canvas from "./canvas/Canvas";
import List from "./list/List";

const App = () => {
  const [paths, setPaths] = useState([]);
  const [checkedPaths, setCheckedPaths] = useState([]);
  const [merge, setMerge] = useState(false);

  console.log(checkedPaths);

  const exportAll = () => {
    if (checkedPaths.length > 0) {
      console.log(JSON.stringify(checkedPaths));
    }
  };

  const mergePolygon = () => {
    setMerge(!merge);
  };

  return (
    <div className="wrap">
      <Canvas
        paths={paths}
        setPaths={setPaths}
        merge={merge}
        checkedPaths={checkedPaths}
      />
      <List
        paths={paths}
        setCheckedPaths={setCheckedPaths}
        checkedPaths={checkedPaths}
        exportAll={exportAll}
        mergePolygon={mergePolygon}
      />
    </div>
  );
};

export default App;

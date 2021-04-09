import React, { useState } from "react";
import "./App.scss";
import Canvas from "./Canvas/Canvas";
import List from "./list/List";

const App = () => {
  const [paths, setPaths] = useState([]); // 그려진 전체 다각형들의 경로 정보
  const [checkedPaths, setCheckedPaths] = useState([]); //병합할 다각형의 경로 정보
  const [merge, setMerge] = useState(false);

  //그려진 다각형의 모든 정보를 JSON화, console.log에 출력
  const exportAll = () => {
    //그려진 다각형이 있다면
    if (paths.length > 0) {
      //다각형의 경로 정보를 JSON화
      let jsonData = JSON.stringify(paths);
      console.log(jsonData);
    }
  };

  const mergePolygon = () => {
    //함수가 호출될 때,
    //checkedPaths의 값이 2개 있으면 merge의 값을 바꾼다.
    if (checkedPaths.length === 2) {
      setMerge(!merge);
    } else {
      return;
    }
  };

  return (
    <div className="wrap">
      {/* paths 라는 state 값을 공유*/}
      <Canvas
        paths={paths}
        setPaths={setPaths}
        merge={merge}
        checkedPaths={checkedPaths}
      />
      <List
        paths={paths}
        exportAll={exportAll}
        checkedPaths={checkedPaths}
        setCheckedPaths={setCheckedPaths}
        mergePolygon={mergePolygon}
      />
    </div>
  );
};

export default App;

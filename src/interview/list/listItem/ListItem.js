import React from "react";
import "./ListItem.scss";

// List 컴포넌트에서 path와 index를 전달받는다.
// List 컴포넌트에서 checkedPaths와 setCheckedPaths를 받아온다.
const ListItem = ({ path, index, checkedPaths, setCheckedPaths }) => {
  //체크가 된 컴포넌트의 데이터(path) 저장하기
  const checkingPath = (event) => {
    //check가 true이면(체크가 되면)
    if (event.target.checked) {
      //현재 컴포넌트가 가지고 있는 path 데이터를 추가함
      setCheckedPaths((checkedPaths) => [...checkedPaths, path]);
    }
    //check가 false이면(체크가 아니면)
    else {
      //체크가 아니면 현재 체크가 된 데이터에서
      //현재 컴포넌트가 가지고 있는 path 데이터를 삭제함
      setCheckedPaths(checkedPaths.filter((el) => el !== path));
    }
  };

  return (
    <div className="list_item_wrap">
      <label className="container">
        {/* 전달받은 다각형(path)의 인덱스를 표시 */}
        Polygon{index}
        {/* onClick 이벤트로 checkingPath 함수 호출 */}
        <input type="checkbox" onClick={checkingPath}></input>
        <span className="checkmark"></span>
      </label>
    </div>
  );
};

export default ListItem;

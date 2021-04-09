import React from "react";
import "./List.scss";
import ListItem from "./listItem/ListItem";
import Button from "./button/Button";

// 부모컴포넌트에서 paths를 받음
// 부모컴포넌트에서 exportAll 을 받음
// 부모컴포넌트에서 checkedPaths, setCheckedPaths를 받음
// 부모컴포넌트에서 mergePolygon 을 받음
const List = ({
  paths,
  exportAll,
  checkedPaths,
  setCheckedPaths,
  mergePolygon,
}) => {
  //그려진 다각형의 list를 그리는 함수
  const renderList = () => {
    //paths가 없으면(그려진 다각형이 없으면)
    if (!paths) {
      return null;
    } else {
      //paths에 map을 사용하여 해당 배열의 요소를 가진
      //ListItem 컴포넌트를 반환한다.
      return paths.map((path, index) => {
        //그려진 다각형 각각의 경로 정보와 해당 다각형의
        //인덱스를 ListItem 컴포넌트에전달한다.
        return (
          <ListItem
            path={path}
            key={index}
            index={index}
            checkedPaths={checkedPaths}
            setCheckedPaths={setCheckedPaths}
          />
        );
      });
    }
  };

  return (
    <div className="list_wrap">
      <div className="items_container">{renderList()}</div>
      <div className="btn_container">
        {/* Button 컴포넌트 추가, clickHandler 라는 이름으로 exportAll 함수 전달 */}
        <Button name="export" clickHandler={exportAll} />
        {/*  다각형 병합을 위한 버튼 */}
        <Button name="merge" clickHandler={mergePolygon} />
      </div>
    </div>
  );
};

export default List;

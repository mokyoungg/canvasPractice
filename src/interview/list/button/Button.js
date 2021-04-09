import React from "react";
import "./Button.scss";

// List 컴포넌트에서 name과 clickHandler를 가져온다.
const Button = ({ name, clickHandler }) => {
  return (
    <div className="btn-wrap">
      {/*버튼 클릭 이벤트로 clickHandler를 호출, 
      이는 List에서 전달받은 함수에 따라 달라지게 된다.*/}
      <button className={name} onClick={clickHandler}>
        {/*전달받은 이름에 따라 버튼의 글자가 달라진다. */}
        {name === "merge" ? "merge selected" : "export all"}
      </button>
    </div>
  );
};

export default Button;

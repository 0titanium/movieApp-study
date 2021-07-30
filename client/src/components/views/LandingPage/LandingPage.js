import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../_actions/user_action";
import { withRouter } from "react-router-dom";

function LandingPage(props) {
  const dispatch = useDispatch();
  
  const onClickHandler = () => {
    dispatch(logoutUser()).then((response) => {
      if (response.payload.logoutSuccess) {
        props.history.push("/login"); // withRouter 필요
      } else {
        alert("Error");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <h2>시작 페이지</h2>

      <button onClick={onClickHandler}>LogOut</button>
    </div>
  );
}

export default withRouter(LandingPage);

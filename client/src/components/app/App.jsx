import React, { useState } from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { ChatPage } from "../chat";
import { Login } from "../login/Login";
import { Signup } from "../signup/Signup";
import { LogOutBtn, Wrapper, LogOutBtnWrapper } from "./styles";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("user"))
  );

  const logOutBtnClickHandler = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return (
    <Wrapper>
      <LogOutBtnWrapper>
        {isLoggedIn && (
          <LogOutBtn onClick={logOutBtnClickHandler}>Log out</LogOutBtn>
        )}
      </LogOutBtnWrapper>
      <div>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Navigate replace to="/chat" />} />
            <Route path="/chat" element={<ChatPage />} exact />
            <Route
              path="/login"
              element={
                isLoggedIn ? (
                  <Navigate replace to="/chat" />
                ) : (
                  <Login setIsLoggedIn={setIsLoggedIn} />
                )
              }
              exact
            />
            <Route
              path="/signup"
              element={
                isLoggedIn ? <Navigate replace to="/chat" /> : <Signup />
              }
              exact
            />
          </Routes>
        </BrowserRouter>
      </div>
    </Wrapper>
  );
}

export default App;

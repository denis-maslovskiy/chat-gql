import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { Chat } from "./Chat";
import { ChatWrapper, ChatContainer, NotLogin, NotLoginLinks } from "./styles";

const ChatPage = () => {
  const [decodedToken, setDecodedToken] = useState(null);

  const token = localStorage.getItem("user");

  useEffect(() => {
    if (token) {
      setDecodedToken(jwt_decode(token));
    }
  }, [token]);

  return (
    <ChatContainer>
      {localStorage.getItem("user") ? (
        <ChatWrapper>
          {decodedToken && <Chat decodedToken={decodedToken} />}
        </ChatWrapper>
      ) : (
        <NotLogin>
          <NotLoginLinks to="/login">Login</NotLoginLinks>
          <NotLoginLinks to="/signup">Sign up</NotLoginLinks>
        </NotLogin>
      )}
    </ChatContainer>
  );
};

export { ChatPage };

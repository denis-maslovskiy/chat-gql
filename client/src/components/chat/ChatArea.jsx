import React, { useEffect, useState, useRef } from "react";
import { useMutation, useReactiveVar } from "@apollo/client";
import moment from "moment";
import { draftMessagesVar } from "../../index";
import { POST_MESSAGE } from "../../graphql/mutations/postMessage";
import paperclip from "../../images/paperclip.png";
import imageNotFound from "../../images/image-not-found.png";
import {
  ChatAreaContainer,
  ChatAreaTitle,
  ChatAreaInput,
  ChatAreaInputForm,
  ChatAreaSendButton,
  ChatNotSelected,
  ChatAreaMessageContainer,
  ChatAreaMessage,
  ChatAreaMessageUsername,
  ChatAreaMessageText,
  ChatAreaTitleContainer,
  ChatAreaTitleBackBtn,
  ChatAreaMessageTime,
  ChatAreaMessageTextContainer,
  ChatAreaTime,
  ChatAreaMessageWrapper,
  ImageFile,
  ChatAreaInputsContainer,
  UploadFileButton,
  UploadedFileMark,
} from "./styles";

const randomColor = () => {
  let color = "#";
  for (let i = 0; i < 3; i++)
    color += (
      "0" + Math.floor(((1 + Math.random()) * Math.pow(16, 2)) / 2).toString(16)
    ).slice(-2);
  return color;
};

const Time = ({ msg, index, prevMsg }) => {
  if (!index)
    return (
      <ChatAreaTime>{moment(+msg.updatedAt).format("MMMM Do")}</ChatAreaTime>
    );
  if (moment(+msg.updatedAt).isAfter(+prevMsg.updatedAt, "day"))
    return (
      <ChatAreaTime>{moment(+msg.updatedAt).format("MMMM Do")}</ChatAreaTime>
    );
  else return null;
};

const FILE_UPLOAD_BODY = "[FILE]";

const ChatArea = ({ selectedChat, currentUserId, setSelectedChat }) => {
  const [messages, setMessages] = useState(selectedChat?.messages || []);
  const [userColors, setUserColors] = useState([]);
  const [messageToSend, setMessageToSend] = useState("");
  const [fileToSend, setFileToSend] = useState(null);
  const [failedToLoadImages, setFailedToLoadImages] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);

  const draftMessages = useReactiveVar(draftMessagesVar);

  const chatContainerRef = useRef(null);
  const uploadFileRef = useRef();

  const [postMessage] = useMutation(POST_MESSAGE);

  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat?.messages || []);

      // Generate color only if the chat changes
      if (currentChatId !== selectedChat.id) {
        setCurrentChatId(selectedChat.id);
        const colorsForUser = [];
        selectedChat?.messages?.forEach((msg) => {
          if (
            msg.sender.id !== currentUserId &&
            !colorsForUser.find((item) => item.userId === msg.sender.id)
          ) {
            colorsForUser.push({
              userId: msg.sender.id,
              color: `${randomColor()}`,
            });
          }
        });
        setUserColors(colorsForUser);
      }

      setTimeout(() => {
        chatContainerRef.current?.scrollIntoView({ block: "end" });
      }, 100);

      setMessageToSend(
        draftMessages.find((draftMsg) => draftMsg.chatId === selectedChat.id)
          ?.msg || ""
      );
    } else {
      setFileToSend(null);
    }
  }, [selectedChat, messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    // Sending for a message
    if (messageToSend.trim()) {
      postMessage({
        variables: {
          body: messageToSend,
          sender: currentUserId,
          chatId: selectedChat.id,
        },
      });
      setMessageToSend("");
      draftMessagesVar(
        draftMessages.filter((draftMsg) => draftMsg.chatId !== selectedChat.id)
      );
    }
    // Sending for a file
    if (fileToSend) {
      postMessage({
        variables: {
          body: FILE_UPLOAD_BODY,
          sender: currentUserId,
          chatId: selectedChat.id,
          file: fileToSend,
        },
      });
      setFileToSend(null);
    }
    // Simultaneous sending of message and file is supported. Message goes first.
  };

  const chatAreaInputChangeHandler = (e) => {
    const message = e.target.value;
    setMessageToSend(message);
    const existingDraftMsg = draftMessages.find(
      (item) => item.chatId === selectedChat.id
    );
    let newDraftMessages;
    if (existingDraftMsg) {
      if (message) {
        newDraftMessages = draftMessages.map((draftMsg) => {
          if (draftMsg.chatId === selectedChat.id) {
            return { ...draftMsg, msg: message };
          }
          return draftMsg;
        });
      } else {
        newDraftMessages = draftMessages.filter(
          (draftMsg) => draftMsg.chatId !== selectedChat.id
        );
      }
      draftMessagesVar(newDraftMessages);
    } else {
      draftMessagesVar([
        ...draftMessages,
        {
          chatId: selectedChat.id,
          msg: message,
          chatTitle: selectedChat.title,
        },
      ]);
    }
  };

  const uploadFileChangeHandler = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setFileToSend(null);
      return;
    }
    setFileToSend(file);
  };

  const uploadFileButtonClickHandler = () => {
    uploadFileRef.current.click();
  };

  const imageOnClickHandler = (fileUrl) => {
    if (!failedToLoadImages.includes(fileUrl)) {
      window.open(fileUrl, "_blank");
    }
  };

  const imageOnErrorHandler = (e, fileUrl) => {
    e.target.onerror = null;
    e.target.src = imageNotFound;
    setFailedToLoadImages([...failedToLoadImages, fileUrl]);
  };

  return (
    <ChatAreaContainer isChatSelected={Boolean(selectedChat)}>
      {selectedChat ? (
        <>
          <ChatAreaTitleContainer>
            <ChatAreaTitleBackBtn onClick={() => setSelectedChat(null)}>
              Back
            </ChatAreaTitleBackBtn>
            <ChatAreaTitle>
              {selectedChat.title || selectedChat.username}
            </ChatAreaTitle>
          </ChatAreaTitleContainer>
          <ChatAreaMessageWrapper>
            {messages?.length ? (
              <ChatAreaMessageContainer ref={chatContainerRef}>
                {messages.map((msg, index) => {
                  if (msg.sender.id === currentUserId)
                    return (
                      <React.Fragment key={msg.updatedAt}>
                        <Time
                          msg={msg}
                          index={index}
                          prevMsg={messages[index - 1]}
                        />
                        <ChatAreaMessage
                          currentUser
                          hasBackground={!Boolean(msg.fileUrl)}
                        >
                          <ChatAreaMessageTextContainer>
                            {msg.fileUrl ? (
                              <ImageFile
                                src={msg.fileUrl}
                                currentUser
                                alt={`File ${msg.fileUrl}`}
                                onClick={() => imageOnClickHandler(msg.fileUrl)}
                                onError={(e) =>
                                  imageOnErrorHandler(e, msg.fileUrl)
                                }
                              />
                            ) : (
                              <ChatAreaMessageText>
                                {msg.body}
                              </ChatAreaMessageText>
                            )}
                            <ChatAreaMessageTime>
                              {moment(+msg.updatedAt).format("h:mm")}
                            </ChatAreaMessageTime>
                          </ChatAreaMessageTextContainer>
                        </ChatAreaMessage>
                      </React.Fragment>
                    );
                  else
                    return (
                      <React.Fragment key={msg.updatedAt}>
                        <Time
                          msg={msg}
                          index={index}
                          prevMsg={messages[index - 1]}
                        />
                        <ChatAreaMessage hasBackground={!Boolean(msg.fileUrl)}>
                          <ChatAreaMessageUsername
                            color={
                              userColors?.find(
                                (item) => item.userId === msg.sender.id
                              )?.color
                            }
                          >
                            {msg.sender.username}
                          </ChatAreaMessageUsername>
                          <ChatAreaMessageTextContainer>
                            {msg.fileUrl ? (
                              <ImageFile
                                src={msg.fileUrl}
                                alt={`File ${msg.fileUrl}`}
                                onClick={() => imageOnClickHandler(msg.fileUrl)}
                                onError={(e) =>
                                  imageOnErrorHandler(e, msg.fileUrl)
                                }
                              />
                            ) : (
                              <ChatAreaMessageText>
                                {msg.body}
                              </ChatAreaMessageText>
                            )}

                            <ChatAreaMessageTime>
                              {moment(+msg.updatedAt).format("h:mm")}
                            </ChatAreaMessageTime>
                          </ChatAreaMessageTextContainer>
                        </ChatAreaMessage>
                      </React.Fragment>
                    );
                })}
              </ChatAreaMessageContainer>
            ) : (
              <div>There are no messages in the chat yet. Be the first!</div>
            )}
          </ChatAreaMessageWrapper>
          <ChatAreaInputsContainer>
            <div>
              <input
                type="file"
                onChange={uploadFileChangeHandler}
                ref={uploadFileRef}
                style={{ display: "none" }}
                accept=".png,.jpg"
              />
              <UploadFileButton onClick={uploadFileButtonClickHandler}>
                <img src={paperclip} alt="paperclip" />
                {fileToSend && <UploadedFileMark />}
              </UploadFileButton>
            </div>
            <ChatAreaInputForm onSubmit={sendMessage}>
              <ChatAreaInput
                placeholder="Write a message..."
                value={messageToSend}
                onChange={chatAreaInputChangeHandler}
              />
              <ChatAreaSendButton onClick={sendMessage}>
                Send
              </ChatAreaSendButton>
            </ChatAreaInputForm>
          </ChatAreaInputsContainer>
        </>
      ) : (
        <ChatNotSelected>Select a chat to start messaging</ChatNotSelected>
      )}
    </ChatAreaContainer>
  );
};

export { ChatArea };

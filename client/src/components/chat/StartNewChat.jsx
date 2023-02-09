import React, { useState } from "react";
import { newChatTitleErrors } from "../constants";
import {
  StartNewChatBtn,
  StartNewChatContainer,
  NewChatModalContainer,
  NewChatModalCloseBtn,
  NewChatModalCloseBtnContainer,
  NewChatModalSearchResultItem,
  NewChatModalSelectedUser,
  NewChatModalSelectedUserCloseButton,
  NewChatModalInput,
  NewChatModalUsersContainer,
  NewChatModalCreateChatButton,
  NewChatModalTitleError,
} from "./styles";

const MIN_CHAT_TITLE_LENGTH = 6;
const MAX_CHAT_TITLE_LENGTH = 50;

const NewChatModal = ({
  closeModalClickHandler,
  allUsersData,
  startChatHandler,
  currentUserId,
}) => {
  const [allUsersToDisplay, setAllUsersToDisplay] = useState(allUsersData);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [chatTitle, setChatTitle] = useState("");
  const [chatTitleErrorMsg, setChatTitleErrorMsg] = useState("");

  const userListItemClickHandler = (userId, username) => {
    if (!selectedUsers.some((user) => user.userId === userId)) {
      setSelectedUsers([...selectedUsers, { userId, username }]);
      const filtered = allUsersToDisplay.filter((user) => user.id !== userId);
      setAllUsersToDisplay(filtered);
    }
  };

  const removeUserFromSelected = (userId) => {
    const updatedList = selectedUsers.filter((user) => user.userId !== userId);
    setSelectedUsers(updatedList);
    setAllUsersToDisplay([
      ...allUsersToDisplay,
      allUsersData.find((user) => user.id === userId),
    ]);
  };

  const filterInputData = (event) => {
    if (!event.target.value) {
      const usersToDisplay = allUsersData.filter((user) => {
        let isOverlap = false;
        selectedUsers.forEach((selectedUser) => {
          if (selectedUser.username === user.username) {
            isOverlap = true;
            return;
          }
        });
        return !isOverlap;
      });
      setAllUsersToDisplay(usersToDisplay);
      return;
    }

    const searchQuery = event.target.value;

    const filteredData = allUsersToDisplay.filter((user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setAllUsersToDisplay(filteredData);
  };

  const createChat = () => {
    const userIds = [];
    selectedUsers.forEach((user) => userIds.push(user.userId));
    userIds.push(currentUserId);
    startChatHandler(chatTitle, userIds);
    setSelectedUsers([]);
    setAllUsersToDisplay(allUsersData);
    setChatTitle("");
    closeModalClickHandler();
  };

  const chatTitleChangeHandler = (e) => {
    setChatTitle(e.target.value);
    if (e.target.value) {
      if (e.target.value.length < MIN_CHAT_TITLE_LENGTH) {
        setChatTitleErrorMsg(newChatTitleErrors.min);
        return;
      }
      if (e.target.value.length >= MAX_CHAT_TITLE_LENGTH) {
        setChatTitleErrorMsg(newChatTitleErrors.max);
        return;
      }
      setChatTitleErrorMsg("");
    }
  };

  return (
    <NewChatModalContainer>
      <NewChatModalCloseBtnContainer>
        <NewChatModalCloseBtn onClick={closeModalClickHandler}>
          &times;
        </NewChatModalCloseBtn>
      </NewChatModalCloseBtnContainer>
      <NewChatModalInput
        placeholder="Find users"
        onChange={filterInputData}
      ></NewChatModalInput>
      <NewChatModalUsersContainer>
        <div>
          {allUsersToDisplay?.map((user) => (
            <NewChatModalSearchResultItem
              key={user.id}
              onClick={() => userListItemClickHandler(user.id, user.username)}
            >
              <span>{user.username}</span>
            </NewChatModalSearchResultItem>
          ))}
        </div>
        <div>
          {Boolean(selectedUsers.length) &&
            selectedUsers.map((user) => (
              <NewChatModalSelectedUser key={user.username}>
                <span>{user.username}</span>
                <NewChatModalSelectedUserCloseButton
                  onClick={() => removeUserFromSelected(user.userId)}
                >
                  &times;
                </NewChatModalSelectedUserCloseButton>
              </NewChatModalSelectedUser>
            ))}
        </div>
      </NewChatModalUsersContainer>
      <NewChatModalInput
        placeholder="Chat title"
        value={chatTitle}
        onChange={chatTitleChangeHandler}
      />
      {chatTitleErrorMsg && (
        <NewChatModalTitleError>{chatTitleErrorMsg}</NewChatModalTitleError>
      )}
      {Boolean(selectedUsers.length) &&
        Boolean(chatTitle) &&
        !Boolean(chatTitleErrorMsg) && (
          <NewChatModalCreateChatButton onClick={createChat}>
            Create chat
          </NewChatModalCreateChatButton>
        )}
    </NewChatModalContainer>
  );
};

const StartNewChat = ({ allUsersData, startChatHandler, currentUserId }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const startNewChatClickHandler = () => {
    setModalOpen(true);
  };

  const closeModalClickHandler = () => {
    setModalOpen(false);
  };

  return (
    <StartNewChatContainer>
      <StartNewChatBtn onClick={startNewChatClickHandler}>
        Start new chat
      </StartNewChatBtn>
      {isModalOpen && (
        <NewChatModal
          closeModalClickHandler={closeModalClickHandler}
          allUsersData={allUsersData}
          startChatHandler={startChatHandler}
          currentUserId={currentUserId}
        />
      )}
    </StartNewChatContainer>
  );
};

export { StartNewChat };

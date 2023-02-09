import React, { useState, useEffect } from "react";
import { useReactiveVar } from "@apollo/client";
import { draftMessagesVar } from "../../index";
import { StartNewChat } from "./StartNewChat";
import {
  SearchNavbarContainer,
  SearchNavbar,
  SearchInput,
  SearchResultItem,
  SearchResultList,
  NoMatchesFound,
  NoticeCircle,
  DraftNotification,
  NotificationContainer,
} from "./styles";

const Search = ({
  allUsersData,
  setSelectedChat,
  startChatHandler,
  currentUserId,
  selectedChat,
  userData,
}) => {
  const [filteredInputData, setFilteredInputData] = useState(userData.chats);
  const [chatsToCheck, setChatsToCheck] = useState(userData.chatsToCheck);

  const draftMessages = useReactiveVar(draftMessagesVar);

  const filterInputData = (event) => {
    if (!event) {
      setFilteredInputData(
        [...userData.chats].sort((a, b) => b.updatedAt - a.updatedAt)
      );
      return;
    }
    const searchQuery = event.target.value;

    const filteredData = userData.chats?.filter((item) => {
      if (!searchQuery) return item;
      if (item.title.toLowerCase().includes(searchQuery)) return item;
    });
    setFilteredInputData(filteredData);
  };

  useEffect(() => {
    filterInputData();
  }, [userData.chats?.length, userData.updatedAt]);

  useEffect(() => {
    setChatsToCheck(userData.chatsToCheck);
  }, [userData.chatsToCheck.length]);

  const searchResultItemClickHandler = (data) => {
    setSelectedChat(data);
  };

  return (
    <SearchNavbarContainer isChatSelected={Boolean(selectedChat)}>
      <SearchNavbar>
        <SearchInput placeholder="Find a chat" onChange={filterInputData} />
      </SearchNavbar>
      <SearchResultList>
        <div>
          {filteredInputData?.length ? (
            filteredInputData?.map((item) => (
              <SearchResultItem
                key={item.id}
                onClick={() => searchResultItemClickHandler(item)}
              >
                <span>{item.title}</span>
                <NotificationContainer>
                  {Boolean(
                    draftMessages.find(
                      (draftMsg) => draftMsg.chatId === item.id
                    )
                  ) && <DraftNotification>Draft</DraftNotification>}
                  {Boolean(
                    chatsToCheck.find((chatId) => chatId === item.id)
                  ) && <NoticeCircle />}
                </NotificationContainer>
              </SearchResultItem>
            ))
          ) : (
            <NoMatchesFound>
              <span>No matches found</span>
            </NoMatchesFound>
          )}
        </div>
      </SearchResultList>
      <StartNewChat
        allUsersData={allUsersData}
        startChatHandler={startChatHandler}
        currentUserId={currentUserId}
      />
    </SearchNavbarContainer>
  );
};

export { Search };

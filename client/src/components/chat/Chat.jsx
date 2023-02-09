import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER } from "../../graphql/queries/getUser";
import { GET_ALL_USERS } from "../../graphql/queries/getAllUsers";
import { START_CHAT } from "../../graphql/mutations/startChat";
import { NEW_MESSAGE_SUBSCRIPTION } from "../../graphql/subscriptions/newMessageSubscription";
import { NEW_CHAT_SUBSCRIPTION } from "../../graphql/subscriptions/newChatSubscription";
import { UPDATE_USER } from "../../graphql/mutations/updateUser";
import { Search } from "./Search";
import { ChatArea } from "./ChatArea";
import { Loading } from "./styles";

const Chat = ({ decodedToken }) => {
  const [userData, setUserData] = useState(null);
  const [allUsersData, setAllUsersData] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);

  const { loading, data, subscribeToMore } = useQuery(GET_USER, {
    variables: { userId: decodedToken?.userId },
  });

  const [startChat] = useMutation(START_CHAT);
  const [updateUser] = useMutation(UPDATE_USER);

  const allUsers = useQuery(GET_ALL_USERS, {
    variables: { userId: decodedToken?.userId },
  });

  useEffect(() => {
    if (data) {
      setUserData(data.user);
      if (selectedChat) {
        const chatsToCheck = data.user.chatsToCheck;
        const chatsToCheckLength = chatsToCheck.length;
        const filteredChatsToCheck = chatsToCheck.filter(
          (chatId) => chatId !== selectedChat?.id
        );

        if (chatsToCheckLength !== filteredChatsToCheck.length) {
          updateUser({
            variables: {
              userId: decodedToken?.userId,
              chatsToCheck: filteredChatsToCheck,
            },
          });
        }

        const updatedSelectedChat = data.user.chats.find(
          (chat) => chat.id === selectedChat?.id
        );
        if (
          JSON.stringify(updatedSelectedChat) !== JSON.stringify(selectedChat)
        )
          setSelectedChat(updatedSelectedChat);
      }
    }
  }, [data, selectedChat]);

  useEffect(() => {
    subscribeToMore({
      document: NEW_MESSAGE_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;

        const newMessage = subscriptionData.data?.newMessage;
        const chatsToCheck = prev.user.chatsToCheck;
        const chatID = subscriptionData.data.newMessage.chat;
        const senderId = subscriptionData.data.newMessage.sender.id;
        const isNeedToRespondToMessage = prev?.user?.chats.find(
          (chat) => chat.id === newMessage.chat
        );

        if (!isNeedToRespondToMessage) return prev;

        const updatedChats = prev?.user?.chats.map((chat) => {
          if (chat.id === newMessage.chat)
            return Object.assign({}, chat, {
              lastMessage: newMessage,
              messages: [...chat.messages, newMessage],
              updatedAt: Date.now(),
            });

          return chat;
        });

        const newChatsToCheck = new Set(chatsToCheck);
        const chatsToCheckSize = newChatsToCheck.size;

        // The user who sent the chat message doesn't have a notification circle
        if (senderId !== prev.user.id) {
          newChatsToCheck.add(chatID);
        }

        if (
          chatsToCheckSize !== newChatsToCheck.size &&
          selectedChat?.id !== newMessage.chat
        ) {
          updateUser({
            variables: {
              userId: prev.user.id,
              chatsToCheck: Array.from(newChatsToCheck),
            },
          });
        }

        return {
          user: Object.assign({}, prev?.user, {
            chats: updatedChats,
            updatedAt: Date.now(),
          }),
        };
      },
    });
    subscribeToMore({
      document: NEW_CHAT_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;

        const newChat = subscriptionData.data?.newChat;
        const isChatWithMe = newChat.users.find(
          (user) => user.id === prev.user.id
        );

        if (!isChatWithMe) {
          return prev;
        } else {
          updateUser({
            variables: {
              userId: prev.user.id,
              chatsToCheck: [...prev.user.chatsToCheck, newChat.id],
            },
          });
        }

        return {
          user: Object.assign({}, prev?.user, {
            chats: [...prev?.user?.chats, newChat],
          }),
        };
      },
    });
  }, [subscribeToMore]);

  useEffect(() => {
    if (allUsers?.data) {
      // `allUsersData` doesn't store the current user, but is passed separately
      const usersWithoutCurrent = allUsers.data?.users.filter(
        (user) => user.id !== decodedToken?.userId
      );
      setAllUsersData(usersWithoutCurrent);
    }
  }, [allUsers?.data, decodedToken?.userId]);

  const startChatHandler = (title, userIds) => {
    startChat({
      variables: {
        title,
        userIds,
      },
    });
  };

  return (
    <>
      {loading && <Loading>Loading...</Loading>}
      {userData && (
        <>
          <Search
            userData={userData}
            allUsersData={allUsersData}
            setSelectedChat={setSelectedChat}
            startChatHandler={startChatHandler}
            currentUserId={decodedToken?.userId}
            selectedChat={selectedChat}
          />
          <ChatArea
            selectedChat={selectedChat}
            currentUserId={decodedToken?.userId}
            setSelectedChat={setSelectedChat}
          />
        </>
      )}
    </>
  );
};

export { Chat };

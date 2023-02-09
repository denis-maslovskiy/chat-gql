import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { FormInput, FormInputError } from "../shareable-styled-components/form";
import { FlexDisplay, Scrollbar } from "../shareable-styled-components/mixins";
import { LogOutBtn } from "../app/styles";
import { colors, screenSizes } from "../constants";

export const ChatContainer = styled.div`
  width: 90%;
  margin: 0 auto;
`;

export const ChatWrapper = styled.div`
  ${FlexDisplay({ justifyContent: "space-between" })};
  min-height: 90vh;
  max-height: 92vh;
`;

export const NotLogin = styled.div`
  ${FlexDisplay({ justifyContent: "space-between" })};
  position: absolute;
  width: 300px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const NotLoginLinks = styled(Link)`
  color: white;
  text-transform: uppercase;
  font-size: 24px;
`;

export const SearchNavbarContainer = styled.div`
  ${FlexDisplay({ flexDirection: "column" })};
  width: 400px;
  padding: 10px 0 10px 10px;
  background-color: ${colors.ultraDarkBlue};
  border-right: 1px solid ${colors.bgcolor};

  @media (max-width: ${screenSizes.landscape}) {
    width: 300px;
  }

  @media (max-width: ${screenSizes.mobile}) {
    ${(props) =>
      props.isChatSelected
        ? css`
            display: none;
          `
        : css`
            width: 100%;
          `}
  }
`;

export const SearchNavbar = styled.div`
  margin-right: 16px;
`;

export const SearchInput = styled(FormInput)`
  width: 100%;
  margin: 0;
  padding: 1px 2px;
`;

export const SearchResultList = styled.div`
  margin-top: 20px;
  border-top: 1px solid ${colors.bgcolor};
  overflow-y: auto;

  ${Scrollbar()};
`;

export const SearchResultItem = styled.div`
  ${FlexDisplay({ alignItems: "center", justifyContent: "space-between" })};
  height: 40px;
  padding-right: 10px;
  font-size: 20px;
  color: ${colors.lightgray};
  border-bottom: 1px solid ${colors.bgcolor};
  cursor: pointer;

  span {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

export const NoMatchesFound = styled(SearchResultItem)`
  cursor: initial;
`;
export const StartNewChatBtn = styled(LogOutBtn)`
  width: 100%;
  float: none;
  margin: 0;
`;

export const StartNewChatContainer = styled.div`
  padding-right: 10px;
  margin-top: 10px;
`;

export const NewChatModalContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 20%;
  margin-left: auto;
  margin-right: auto;
  width: 300px;
  background-color: ${colors.lightgray};
  padding: 20px;
  z-index: 2;
  border-radius: 5px;

  @media (max-width: ${screenSizes.landscape}) {
    width: 290px;
    padding: 15px;
  }
`;

export const NewChatModalCloseBtnContainer = styled.div`
  ${FlexDisplay({ justifyContent: "flex-end" })};
`;

export const NewChatModalCloseBtn = styled.button`
  border-radius: 5px;
  cursor: pointer;
  border: none;
  width: 25px;
  height: 25px;
  background-color: ${colors.darkBlue};
  font-size: 20px;
  color: white;
`;

export const NewChatModalSearchResultItem = styled.div`
  margin-top: 5px;
  color: ${colors.blue};
  border: 1px solid;
  padding: 2px;
  cursor: pointer;
  width: 130px;
`;

export const NewChatModalSelectedUser = styled(NewChatModalSearchResultItem)`
  ${FlexDisplay({ justifyContent: "space-between" })};
  color: ${colors.ultraDarkBlue};
  cursor: initial;
`;

export const NewChatModalSelectedUserCloseButton = styled(NewChatModalCloseBtn)`
  ${FlexDisplay({ justifyContent: "center", alignItems: "center" })};
  background-color: initial;
  border: 1px solid ${colors.ultraDarkBlue};
  color: ${colors.ultraDarkBlue};
  width: 20px;
  height: 20px;
`;

export const NewChatModalInput = styled(SearchInput)`
  margin: 10px 0;
  width: 275px;
`;

export const NewChatModalUsersContainer = styled.div`
  ${FlexDisplay({ justifyContent: "space-between" })};
  width: 300px;
`;

export const NewChatModalCreateChatButton = styled(StartNewChatBtn)`
  margin-top: 10px;
`;

export const NewChatModalTitleError = styled(FormInputError)`
  padding: 0;
`;

export const ChatAreaContainer = styled.div`
  ${FlexDisplay({ flexDirection: "column" })};
  width: 100%;
  background-color: ${colors.ultraDarkBlue};
  color: white;
  padding: 10px;
  position: relative;

  @media (max-width: ${screenSizes.mobile}) {
    ${(props) =>
      props.isChatSelected
        ? css``
        : css`
            display: none;
          `}
  }
`;

export const ChatAreaTitleContainer = styled.div`
  ${FlexDisplay({ alignItems: "center" })};
  border: 1px solid ${colors.lightgray};
  padding: 5px;
  text-align: center;
`;

export const ChatAreaMessageWrapper = styled.div`
  overflow-y: auto;

  ${Scrollbar()};
`;

export const ChatAreaTitleBackBtn = styled(StartNewChatBtn)`
  display: none;
  display: block;
  height: 30px;
  margin-right: 10px;
  width: inherit;
`;

export const ChatAreaTitle = styled.div`
  ${FlexDisplay({ justifyContent: "center", alignItems: "center" })};
  height: 55px;
  font-size: 30px;
  width: 100%;

  @media (max-width: ${screenSizes.landscape}) {
    font-size: 24px;
  }

  @media (max-width: ${screenSizes.mobile}) {
    font-size: 20px;
  }
`;

export const ChatAreaInputForm = styled.form`
  ${FlexDisplay({ justifyContent: "center" })};
  width: 100%;
  padding: 5px 0;

  @media (max-width: ${screenSizes.landscape}) {
    justify-content: flex-start;
  }
`;

export const ChatAreaInput = styled(FormInput)`
  width: 100%;
  margin: 0;
`;

export const ChatAreaSendButton = styled(LogOutBtn)`
  height: auto;
  width: auto;
  float: none;
  margin: 0;
  margin-left: 20px;

  @media (max-width: ${screenSizes.mobile}) {
    margin-left: 10px;
  }
`;

export const ChatNotSelected = styled.div`
  ${FlexDisplay({ justifyContent: "center", alignItems: "center" })};
  height: 100%;
`;

export const ChatAreaMessageContainer = styled.div`
  ${FlexDisplay({ flexDirection: "column" })};
  padding-top: 10px;
`;

export const ChatAreaMessage = styled.div`
  ${FlexDisplay({ flexDirection: "column" })};
  padding: 5px;
  border-radius: 8px;
  width: fit-content;
  background-color: ${({ hasBackground }) =>
    hasBackground ? colors.darkBlue : "transparent"};
  max-width: 400px;
  margin: 5px 0;

  ${(props) =>
    props.currentUser &&
    css`
      align-self: end;
      background-color: ${props.hasBackground ? colors.blue : "transparent"};
    `};
`;

export const ChatAreaMessageUsername = styled.span`
  color: ${(props) => props.color};
`;

export const ChatAreaMessageTextContainer = styled.div`
  ${FlexDisplay({})};
`;

export const ChatAreaMessageText = styled.span`
  word-break: break-all;
`;

export const ChatAreaMessageTime = styled.span`
  align-self: flex-end;
  margin-left: 10px;
  font-size: 11px;
`;

export const Loading = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  color: white;
  font-size: 30px;
  transform: translate(-50%, -50%);
`;

export const ChatAreaTime = styled.div`
  text-align: center;
`;

export const NoticeCircle = styled.span`
  height: 10px;
  width: 10px;
  background-color: ${colors.darkBlue};
  border-radius: 50%;
`;

export const DraftNotification = styled.span`
  color: ${colors.lightRed};
  font-size: 18px;
`;

export const NotificationContainer = styled.div`
  ${FlexDisplay({ justifyContent: "space-between", alignItems: "center" })};
  width: 60px;
`;

export const ImageFile = styled.img`
  max-width: 200px;
  cursor: pointer;
  border: 1px solid ${({ currentUser }) => currentUser ? colors.blue : colors.darkBlue};
  border-radius: 10px;
  padding: 1px;
`;

export const ChatAreaInputsContainer = styled.div`
  ${FlexDisplay({ justifyContent: "space-around", alignItems: "center" })};
  margin-right: 5px;
  margin-top: auto;
`;

export const UploadFileButton = styled.button`
  ${FlexDisplay({ justifyContent: "center", alignItems: "center" })};
  height: 36px;
  width: 40px;
  margin-right: 10px;
  background-color: ${colors.darkBlue};
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

export const UploadedFileMark = styled.span`
  width: 8px;
  height: 8px;
  position: absolute;
  background-color: ${colors.brightRed};
  margin-left: 25px;
  margin-bottom: 20px;
  border-radius: 50%;
`;

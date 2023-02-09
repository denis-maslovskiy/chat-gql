import styled from "styled-components";
import { colors } from "../constants";

export const LogOutBtn = styled.button`
  width: 100px;
  height: 30px;
  float: right;
  margin: 10px 0;
  border: none;
  background-color: ${colors.darkBlue};
  color: white;
  text-transform: uppercase;
  font-size: 15px;
  border-radius: 6px;
  cursor: pointer;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LogOutBtnWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`

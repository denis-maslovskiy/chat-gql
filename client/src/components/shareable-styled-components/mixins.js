import { css } from "styled-components";
import { colors } from "../constants";

export const FlexDisplay = ({
  justifyContent = "flex-start",
  alignItems = "stretch",
  flexDirection = "row",
  flexWrap = "nowrap",
}) => css`
  display: flex;
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  flex-direction: ${flexDirection};
  flex-wrap: ${flexWrap};
`;

export const Scrollbar = () => css`
  ::-webkit-scrollbar {
    width: 15px;
  }
  ::-webkit-scrollbar-track {
    background: ${colors.ultraDarkBlue};
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${colors.bgcolor};
    border-radius: 20px;
    border: 3px solid ${colors.ultraDarkBlue};
  }
`;

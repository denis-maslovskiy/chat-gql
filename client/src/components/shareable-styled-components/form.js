import styled from "styled-components";
import { colors, screenSizes } from "../constants";
import { FlexDisplay } from "./mixins";

export const FormWrapper = styled.div`
  ${FlexDisplay({
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  })};
  width: 100%;
  height: 100vh;
`;

export const FormTitle = styled.h1`
  color: ${colors.lightgray};
`;

export const Form = styled.form`
  width: 600px;
  ${FlexDisplay({ flexDirection: "column" })};

  @media (max-width: ${screenSizes.mobile}) {
    width: 350px;
  }
`;

export const FormInput = styled.input`
  margin: 15px 10px 5px 10px;
  height: 30px;
  border-radius: 8px;
  border: 2px solid gray;
  font-size: 20px;
  padding-left: 20px;
  background-color: ${colors.lightgray};
`;

export const FormInputError = styled.span`
  padding-left: 10px;
  color: red;
  font-weight: 500;
`;

export const FormSubmitButton = styled.input`
  margin: 80px 10px 0 10px;
  height: 30px;
  background-color: ${colors.darkBlue};
  border: none;
  color: ${colors.lightgray};
  text-transform: uppercase;
  font-size: 18px;
  cursor: pointer;

  &:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`;

export const BackendErrorMessage = styled(FormInputError)`
  padding: 0;
`;

export const LoginSignUpSwitch = styled.span`
  margin-top: 15px;
  color: ${colors.blue};

  a {
    color: ${colors.darkBlue};
  }
`;

export const UserCreatedMessage = styled(BackendErrorMessage)`
  color: green;
`;

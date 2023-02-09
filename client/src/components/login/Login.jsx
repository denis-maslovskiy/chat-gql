import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SIGN_IN } from "../../graphql/mutations/signIn";
import {
  FormWrapper,
  Form,
  FormInput,
  FormInputError,
  FormSubmitButton,
  FormTitle,
  BackendErrorMessage,
  LoginSignUpSwitch,
} from "../shareable-styled-components/form";
import { emailValidationPattern, formErrorMessages } from "../constants";

const Login = ({ setIsLoggedIn }) => {
  const [backendErrorMessage, setBackendErrorMessage] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [signIn] = useMutation(SIGN_IN, {
    onError: (err) => setBackendErrorMessage(err.message),
  });

  const onSubmit = ({ email, password }) => {
    signIn({
      variables: {
        email,
        password,
      },
    }).then(({ data }) => {
      if (data) {
        setBackendErrorMessage("");
        localStorage.setItem("user", JSON.stringify(data?.signIn.token));
        setIsLoggedIn(true);
        navigate("/chat");
      }
    });
  };

  return (
    <FormWrapper>
      <FormTitle>Login</FormTitle>
      {backendErrorMessage && (
        <BackendErrorMessage>{backendErrorMessage}</BackendErrorMessage>
      )}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="text"
          placeholder="Email"
          name="email"
          {...register("email", {
            required: formErrorMessages.isRequired("Email"),
            pattern: {
              value: emailValidationPattern,
              message: formErrorMessages.enterValidEmail,
            },
          })}
        />
        {errors && errors.email && (
          <FormInputError>{errors.email.message}</FormInputError>
        )}
        <FormInput
          type="password"
          placeholder="Password"
          {...register("password", {
            required: formErrorMessages.isRequired("Password"),
          })}
        />
        {errors && errors.password && (
          <FormInputError>{errors.password.message}</FormInputError>
        )}
        <FormSubmitButton
          type="submit"
          disabled={!!Object.keys(errors).length}
        />
      </Form>
      <LoginSignUpSwitch>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </LoginSignUpSwitch>
    </FormWrapper>
  );
};

export { Login };

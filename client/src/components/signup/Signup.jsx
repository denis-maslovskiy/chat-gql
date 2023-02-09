import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SIGN_UP } from "../../graphql/mutations/signUp";
import {
  FormWrapper,
  Form,
  FormInput,
  FormInputError,
  FormSubmitButton,
  FormTitle,
  BackendErrorMessage,
  LoginSignUpSwitch,
  UserCreatedMessage,
} from "../shareable-styled-components/form";
import {
  emailValidationPattern,
  onlyLettersPattern,
  formErrorMessages,
} from "../constants";

const Signup = () => {
  const [backendErrorMessage, setBackendErrorMessage] = useState("");
  const [userCreatedMessage, setUserCreatedMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [signUp] = useMutation(SIGN_UP, {
    onError: (err) => {
      const splittedErrMsg = err.message.split(",");
      const res = [];
      splittedErrMsg.forEach((msg) =>
        res.push(msg.split(":")[msg.split(":").length - 1])
      );
      setBackendErrorMessage(res.join());
    },
  });

  const onSubmit = ({ email, username, name, password }) => {
    setUserCreatedMessage("");
    signUp({
      variables: {
        email,
        username,
        name,
        password,
      },
    }).then(({ data }) => {
      if (data) {
        setBackendErrorMessage("");
        setUserCreatedMessage(`User "${username}" successfully created!`);
      }
    });
  };

  return (
    <FormWrapper>
      <FormTitle>Sign up</FormTitle>
      {backendErrorMessage && (
        <BackendErrorMessage>{backendErrorMessage}</BackendErrorMessage>
      )}
      {userCreatedMessage && (
        <UserCreatedMessage>{userCreatedMessage}</UserCreatedMessage>
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
          type="username"
          placeholder="Username"
          {...register("username", {
            required: formErrorMessages.isRequired("Username"),
            minLength: {
              value: 3,
              message: formErrorMessages.minLength("Username", 3),
            },
            maxLength: {
              value: 30,
              message: formErrorMessages.maxLength("Username", 30),
            },
            pattern: {
              value: onlyLettersPattern,
              message: formErrorMessages.containOnlyLetters("Username"),
            },
          })}
        />
        {errors && errors.username && (
          <FormInputError>{errors.username.message}</FormInputError>
        )}
        <FormInput
          type="name"
          placeholder="Name"
          {...register("name", {
            required: formErrorMessages.isRequired("NameName"),
            maxLength: {
              value: 50,
              message: formErrorMessages.maxLength("Name", 50),
            },
            pattern: {
              value: onlyLettersPattern,
              message: formErrorMessages.containOnlyLetters("Name"),
            },
          })}
        />
        {errors && errors.name && (
          <FormInputError>{errors.name.message}</FormInputError>
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
        Have an account? <Link to="/login">Log in</Link>
      </LoginSignUpSwitch>
    </FormWrapper>
  );
};

export { Signup };

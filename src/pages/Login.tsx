import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { LoginButton } from "../components/Buttons";
import api from "../queries/api";
import { ServerTokenResponse } from "../queries/types";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
`;

const LoginModal = styled.div`
  padding: 24px 16px;
  border: 1px solid var(--light-gray);
  border-radius: 4px;
  background-color: var(--primary);
  width: 50%;
  display: flex;
  flex-direction: column;
  max-width: 400px;
`;

const SecondaryText = styled.span`
  opacity: 0.7;
`;

export const Login = (): JSX.Element => {
  const history = useHistory();
  useEffect(() => {
    if (history.location.search.includes("code=")) {
      api
        .get<ServerTokenResponse>(`/callback/${history.location.search}`)
        .then((res) => {
          window.localStorage.setItem("token", res.data.token);
          history.push("/app");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [history]);
  return (
    <Container>
      <LoginModal>
        <h1>Login</h1>
        <LoginButton />
        <SecondaryText>* Premium Spotify account required</SecondaryText>
      </LoginModal>
    </Container>
  );
};

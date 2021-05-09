import React, { useEffect, useState, useRef } from "react";
import { useLocation, useHistory } from "react-router";
import { GetUser } from "../queries/hooks/GetUser";
import styled, { keyframes } from "styled-components";
import { Home } from "../components/grid/Home";

import { LoginButton } from "../components/Buttons";

const MainWrapper = styled.div`
  grid-area: main;
`;

const Main = () => {
  const { search } = useLocation();
  const history = useHistory();

  // const { data: code } = GetToken();
  const { isLoading, error, data } = GetUser();
  if (search === "?error=access_denied") {
    console.error("You need to authorize spotify for this App to work");
    history.push("/error");
  }

  const token = window.localStorage.getItem("token");
  if (!token)
    return (
      <>
        <h2>You need to login</h2>
        <LoginButton>Login</LoginButton>
      </>
    );
  // }, []);
  return (
    <MainWrapper>
      <Home />
      {data?.username}
    </MainWrapper>
  );
};

export default Main;

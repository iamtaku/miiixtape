import React, { useEffect, useState, useRef } from "react";
import { useLocation, useHistory } from "react-router";
import axios from "axios";
import { useQuery } from "react-query";
import { GetUser } from "../queries/GetUser";
import { GetToken } from "../queries/GetToken";
import styled, { keyframes } from "styled-components";
import Player from "../components/grid/players";
import { Home } from "../components/grid/Home";

import SpotifyWebApi from "spotify-web-api-js";
import { LoginButton } from "../components/Buttons";
import { ServerTokenResponse } from "../queries/types";

const BASE = "http://localhost:3000/api/v1";

const MainWrapper = styled.div`
  grid-area: main;
`;

const Main = () => {
  const { search } = useLocation();
  const history = useHistory();

  const { data: code } = GetToken();
  const { isLoading, error, data } = GetUser(code);
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

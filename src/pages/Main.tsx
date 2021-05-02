import React, { useEffect, useState, useRef } from "react";
import { useLocation, useHistory } from "react-router";
import axios from "axios";
import { useQuery } from "react-query";
import { GetUser } from "../queries/GetUser";
import styled, { keyframes } from "styled-components";
import Player from "../components/players";
import { Home } from "../components/grid/Home";

import SpotifyWebApi from "spotify-web-api-js";
import { LoginButton } from "../components/Buttons";
import { ServerTokenResponse } from "../queries/types";

const BASE = "http://localhost:3000/api/v1";

const getToken = async () => {
  //if we have a token in localstorage return it
  let token = window.localStorage.getItem("token");
  if (token) {
    window.history.replaceState(null, "new page title", "/app");
    return token;
  } //otherwise, fetch a token

  const code = window.location.search;
  if (code) {
    const {
      data: { token },
    } = await axios.get<ServerTokenResponse>(`${BASE}/callback/${code}`);
    window.localStorage.setItem("token", token);
    window.history.replaceState(null, "new page title", "/app");
    return token;
  }
};

const Main = () => {
  const { search } = useLocation();
  const history = useHistory();

  // const code = window.location.search;
  // console.log(code);
  // if (code) {
  // getToken();
  // }

  const { data: code } = useQuery("token", getToken);
  const { isLoading, error, data } = GetUser(code);
  // if (error) return <h2>You need to Login</h2>;
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
    <div>
      <Home />
      {data?.username}
    </div>
  );
};

export default Main;

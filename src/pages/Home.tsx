import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router";
import axios from "axios";
import { useQuery } from "react-query";
import { GetUser } from "../queries";

import styled, { keyframes } from "styled-components";
import Player from "../components/players";
import { Navbar } from "../components/Navbar";
import { Main } from "../components/Main";
import { Sidebar } from "../components/Sidebar";

import { LoginButton } from "../components/Buttons";

const rotote = keyframes`{
    0%,
    80%,
    100% {
      box-shadow: 0 2.5em 0 -1.3em;
    }
    40% {
      box-shadow: 0 2.5em 0 0;
    }
  }
`;

const Loading = styled.div`
  .loader,
  .loader:before,
  .loader:after {
    border-radius: 50%;
    width: 2.5em;
    height: 2.5em;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation: ${rotote} 1.8s infinite ease-in-out;
    animation: ${rotote} 1.8s infinite ease-in-out;
  }
  .loader {
    color: #220c0c;
    font-size: 10px;
    margin: 80px auto;
    position: relative;
    text-indent: -9999em;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }
  .loader:before,
  .loader:after {
    content: "";
    position: absolute;
    top: 0;
  }
  .loader:before {
    left: -3.5em;
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }
  .loader:after {
    left: 3.5em;
  }
}
`;

const Home = ({ location }: any) => {
  // const { isLoading, error, data } = GetUser();
  const { search } = useLocation();
  const history = useHistory();
  const { isLoading, error, data } = GetUser(search);

  if (search === "?error=access_denied") {
    console.error("You need to authorize spotify for this App to work");
    history.push("/error");
  }

  const [token, setToken] = useState("");
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    token && setToken(token);
  }, []);

  window.history.replaceState(null, "new page title", "/app");

  if (!token) {
    return (
      <div>
        <LoginButton>Please login with Spotify</LoginButton>
      </div>
    );
  }
  return (
    <div>
      {/* <p>{data}</p> */}
      <h1>this is the app app</h1>
      <Navbar />
      <Sidebar />
      <Main />
      {/* <Player /> */}
    </div>
  );
};

export default Home;

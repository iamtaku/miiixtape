import React, { useEffect, useState, useRef } from "react";
import { useLocation, useHistory } from "react-router";
import axios from "axios";
import { useQuery } from "react-query";
import { GetUser } from "../queries";
import { getToken } from "../adapters";
import styled, { keyframes } from "styled-components";
import Player from "../components/players";
import { Navbar } from "../components/Navbar";
import { Main } from "../components/Main";
import { Sidebar } from "../components/Sidebar";

import { LoginButton } from "../components/Buttons";
import SpotifyWebApi from "spotify-web-api-js";



const Home = () => {
  const { search } = useLocation();
  const history = useHistory();
  // useE
  const { isLoading, error, data } = GetUser();

  if (search === "?error=access_denied") {
    console.error("You need to authorize spotify for this App to work");
    history.push("/error");
  }

  window.history.replaceState(null, "new page title", "/app");

  return (
    <div>
      <Navbar />
      <Sidebar />
      <Main />
    </div>
  );
};

export default Home;

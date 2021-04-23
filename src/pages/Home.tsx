import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router";
import axios from "axios";
import { useQuery } from "react-query";
import { GetUser } from "../queries";

import styled, { keyframes } from "styled-components";
import Player from "../components/players";

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
  const { isLoading, error, data } = useQuery("authenticateUser", () =>
    GetUser(location.search)
  );
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const [accessToken, setAccessToken] = useState("");

  // useEffect(() => {
  //   const token = window.localStorage.getItem("access_token");
  //   if (token) setAccessToken(token);
  // }, []);

  console.log(history);
  return (
    <div>
      <p>{JSON.stringify(data)}</p>
      <h1>this is the home app</h1>
      <p>{loading ? "loading" : "finished!"}</p>
      {user}
      <Loading>
        <div className="loader"></div>
      </Loading>
      {accessToken && <Player token={accessToken} />}
    </div>
  );
};

export default Home;

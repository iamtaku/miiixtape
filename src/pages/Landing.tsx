import React, { useEffect, useState } from "react";
import { HomeBtn } from "../components/Buttons";
import styled from "styled-components";

const LandingWrapper = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const Landing = () => {
  const [token, setToken] = useState("");
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    token && setToken(token);
  }, []);

  return (
    <LandingWrapper>
      <h1>this is the landing page!</h1>
      <HomeBtn>{token ? "Open Playlist" : "Login with Spotify"}</HomeBtn>
    </LandingWrapper>
  );
};

export default Landing;

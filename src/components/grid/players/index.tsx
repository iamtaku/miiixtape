import React from "react";
import { Spotify } from "./Spotify";
import styled from "styled-components";
import { useQuery } from "react-query";
import { GetUser } from "../../../queries/GetUser";

const PlayerWrapper = styled.div`
  grid-area: player;
`;
const Player = () => {
  const { data, isLoading, error } = GetUser();
  console.log(data);
  return (
    <PlayerWrapper>
      <Spotify token={data?.access_token} />{" "}
    </PlayerWrapper>
  );
};

export default Player;

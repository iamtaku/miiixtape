import React from "react";
import { Spotify } from "./Spotify";
import styled from "styled-components";
import { useQuery } from "react-query";
import { GetUser } from "../../queries/hooks/GetUser";
import { useGlobalContext } from "../../state/context";

const PlayerWrapper = styled.div`
  grid-area: player;
`;
const Player = () => {
  const { data, isLoading, error } = GetUser();
  const { state, dispatch } = useGlobalContext();

  console.log(data);
  return (
    <PlayerWrapper>
      <Spotify
        token={data?.access_token}
        uris={state.player.currentSong.uri}
        play={state.player.isPlaying}
      />
    </PlayerWrapper>
  );
};

export default Player;

import React, { useState } from "react";
import { Spotify } from "./Spotify";
import styled from "styled-components";
import { GetUser } from "../../queries/hooks/GetUser";
import { useGlobalContext } from "../../state/context";
import { Youtube } from "./Youtube";
import { Controls } from "./Controls";
import SpotifyWebPlayer from "react-spotify-web-playback/lib";

const PlayerWrapper = styled.div`
  grid-area: player;
`;

const TestDiv = styled.div`
  display: flex;
  align-items: center;
`;
const Player = () => {
  const { state, dispatch } = useGlobalContext();
  const [youtube, setYoutube] = useState<any>();
  const [spotify, setSpotify] = useState<SpotifyWebPlayer | undefined>();

  return (
    <PlayerWrapper>
      <TestDiv>
        {state.player.isPlaying ? (
          <h2>Playing {state.player.currentService}</h2>
        ) : (
          <h2>paused...</h2>
        )}
        <h2>: {state.player.currentSong?.name}</h2>
        <p>{state.player.playbackPosition}</p>
      </TestDiv>
      <Controls youtube={youtube} spotify={spotify} />
      <Youtube
        play={
          state.player.isPlaying && state.player.currentService === "youtube"
        }
        setYoutube={setYoutube}
      />
      <Spotify setSpotify={setSpotify} />
    </PlayerWrapper>
  );
};

export default Player;

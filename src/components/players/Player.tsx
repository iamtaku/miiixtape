import React, { useState } from "react";
import { Spotify } from "./Spotify";
import styled from "styled-components";
import { useGlobalContext } from "../../state/context";
import { Youtube } from "./Youtube";
import { Controls } from "./Controls";
import SpotifyWebPlayer from "react-spotify-web-playback/lib";

const PlayerWrapper = styled.div`
  grid-area: player;
  display: flex;
`;

const Player = () => {
  const { state, dispatch } = useGlobalContext();
  const [youtube, setYoutube] = useState<any>();
  const [spotify, setSpotify] = useState<SpotifyWebPlayer | undefined>();

  return (
    <PlayerWrapper>
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

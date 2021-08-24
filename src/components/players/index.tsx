import React from "react";
import { useState } from "react";
import { Spotify } from "./Spotify";
import ReactHowler from "react-howler";
import SpotifyWebPlayer from "react-spotify-web-playback/lib";
import { YouTubePlayer } from "youtube-player/dist/types";
import { useGlobalContext } from "../../state/context";
import { Youtube } from "./Youtube";
import { Controls } from "./Controls";
import { Soundcloud } from "./Soundcloud";
import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
  from {
   opacity: 0;
  }
  to {
   opacity: 1;
  } 
`;

const Container = styled.div`
  position: absolute;
  bottom: 0;
  display: grid;
  grid-template-rows: 20% 60% 20%;
  grid-template-columns: 1fr 80% 1fr;
  grid-template-areas:
    ". top-middle ."
    "left middle right"
    ". bottom .";
  width: 100%;
  grid-column-gap: 8px;
  height: 120px;
  max-width: 800px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50px;
  background-color: rgba(15, 11, 11, 0.5);
  background-color: linear-gradient(
    270deg,
    rgba(142, 142, 142, 1) 0%,
    rgba(53, 53, 53, 1) 100%
  );
  backdrop-filter: blur(10px) contrast(0.8);
  box-shadow: 20px 20px 60px #2d2d2d, -20px -20px 60px #3d3d3d;
  animation: ${slideIn} 0.4s ease-out;
`;

const Player = (): JSX.Element | null => {
  const { state } = useGlobalContext();
  const [youtube, setYoutube] = useState<YouTubePlayer>();
  const [spotify, setSpotify] = useState<SpotifyWebPlayer>();
  const [soundcloud, setSoundCloud] = useState<ReactHowler>();
  const uri = state.player?.currentSong?.uri;

  if (!state.player.currentSong) return null;

  return (
    <Container>
      {state.player.currentSong?.service === "youtube" && (
        <Youtube setYoutube={setYoutube} />
      )}
      {state.player.currentSong?.service === "spotify" && (
        <Spotify setSpotify={setSpotify} />
      )}
      {state.player.currentSong?.service === "soundcloud" && (
        <Soundcloud setSoundCloud={setSoundCloud} uri={uri} />
      )}
      <Controls youtube={youtube} spotify={spotify} soundcloud={soundcloud} />
    </Container>
  );
};

export default Player;

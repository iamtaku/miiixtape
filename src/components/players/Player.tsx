import React, { useState } from "react";
import { Spotify } from "./Spotify";
import styled from "styled-components";
import { useGlobalContext } from "../../state/context";
import { Youtube } from "./Youtube";
import { Controls } from "./Controls";
import SpotifyWebPlayer from "react-spotify-web-playback/lib";
import { Soundcloud } from "./Soundcloud";
import { YouTubePlayer } from "youtube-player/dist/types";
import ReactHowler from "react-howler";
import { useGetUser } from "../../queries/hooks";

const Wrapper = styled.div`
  grid-area: player;
  display: flex;
`;

const Player = () => {
  const { state, dispatch } = useGlobalContext();
  const { data: userInfo } = useGetUser();
  const [youtube, setYoutube] = useState<YouTubePlayer>();
  const [spotify, setSpotify] = useState<SpotifyWebPlayer>();
  const [soundcloud, setSoundCloud] = useState<ReactHowler>();
  return (
    <Wrapper>
      <Controls youtube={youtube} spotify={spotify} soundcloud={soundcloud} />
      {state.player.currentService === "youtube" && (
        <Youtube
          play={
            state.player.isPlaying && state.player.currentService === "youtube"
          }
          setYoutube={setYoutube}
        />
      )}
      {state.player.currentService === "spotify" && userInfo && (
        <Spotify setSpotify={setSpotify} token={userInfo.access_token} />
      )}
      {state.player.currentService === "soundcloud" && (
        <Soundcloud setSoundCloud={setSoundCloud} />
      )}
    </Wrapper>
  );
};

export default Player;

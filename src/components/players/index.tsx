import { useState } from "react";
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
  /* display: flex; */
  display: grid;
  grid-template-columns: 2fr 1fr;
`;

const Player = () => {
  const { state, dispatch } = useGlobalContext();
  const { data: userInfo } = useGetUser();
  const [youtube, setYoutube] = useState<YouTubePlayer>();
  const [spotify, setSpotify] = useState<SpotifyWebPlayer>();
  const [soundcloud, setSoundCloud] = useState<ReactHowler>();
  const uri = state.player?.currentSong?.uri;

  return (
    <Wrapper>
      <Controls youtube={youtube} spotify={spotify} soundcloud={soundcloud} />
      {state.player.currentSong?.service === "youtube" && (
        <Youtube setYoutube={setYoutube} uri={uri} />
      )}
      {state.player.currentSong?.service === "spotify" && userInfo && (
        <Spotify
          setSpotify={setSpotify}
          token={userInfo.access_token}
          uri={uri}
        />
      )}
      {state.player.currentSong?.service === "soundcloud" && (
        <Soundcloud setSoundCloud={setSoundCloud} uri={uri} />
      )}
    </Wrapper>
  );
};

export default Player;

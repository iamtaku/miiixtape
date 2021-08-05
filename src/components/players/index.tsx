import { useState } from "react";
import { Spotify } from "./Spotify";
import ReactHowler from "react-howler";
import SpotifyWebPlayer from "react-spotify-web-playback/lib";
import { YouTubePlayer } from "youtube-player/dist/types";
import { useGlobalContext } from "../../state/context";
import { Youtube } from "./Youtube";
import { Controls } from "./Controls";
import { Soundcloud } from "./Soundcloud";
import { useGetUser } from "../../queries/hooks";

const Player = () => {
  const { state } = useGlobalContext();
  const { data: userInfo } = useGetUser();
  const [youtube, setYoutube] = useState<YouTubePlayer>();
  const [spotify, setSpotify] = useState<SpotifyWebPlayer>();
  const [soundcloud, setSoundCloud] = useState<ReactHowler>();
  const uri = state.player?.currentSong?.uri;

  return (
    <>
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
      <Controls youtube={youtube} spotify={spotify} soundcloud={soundcloud} />
    </>
  );
};

export default Player;

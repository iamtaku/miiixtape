import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import SpotifyPlayer, { CallbackState } from "react-spotify-web-playback";
import { GetUser } from "../../queries/hooks/GetUser";
import { useGlobalContext } from "../../state/context";

interface SpotifyProps {
  setSpotify: Dispatch<SetStateAction<SpotifyPlayer | undefined>>;
}

export const Spotify: React.FC<SpotifyProps> = ({ setSpotify }) => {
  const { data: userInfo } = GetUser();
  const { dispatch, state } = useGlobalContext();
  const ref = useRef<SpotifyPlayer>(null);

  const handleCallback = (callbackState: CallbackState) => {
    console.log(callbackState);
    if (
      callbackState.type === "player_update" &&
      callbackState.isPlaying === false &&
      callbackState.position === 0
    ) {
      dispatch({
        type: "PLAY_NEXT",
        payload: {},
      });
    }
    if (state.player.currentService !== "spotify") {
      console.log("not spotify");
      ref.current?.setState({ needsUpdate: true });
    }
    if (ref.current?.state.isPlaying) {
      console.log("spotify playing");
      dispatch({ type: "PLAY", payload: {} });
    }

    if (callbackState.error) {
      // console.error()
      console.error(callbackState);
    }
  };

  const uri =
    state.player.currentService === "spotify"
      ? state.player.currentSong?.uri
      : undefined;
  console.log(uri);

  if (userInfo?.access_token) {
    return (
      <>
        <SpotifyPlayer
          token={userInfo.access_token}
          name="plaaaylist player"
          // uris={state.player.playlistTracks
          //   ?.filter((song) => song.service === "spotify")
          //   .map((song) => song.uri)}
          uris={uri}
          // offset={state.player.playbackPosition}
          callback={handleCallback}
          // autoPlay={true}
          play={
            state.player.isPlaying && state.player.currentService === "spotify"
          }
          ref={ref}
        />
      </>
    );
  }

  return <h1>Error</h1>;
};

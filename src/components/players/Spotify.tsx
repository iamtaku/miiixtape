import React, { Dispatch, SetStateAction, useRef } from "react";
import SpotifyPlayer, { CallbackState } from "react-spotify-web-playback";
import { useAuth } from "../../queries/hooks/useAuth";
import { useGlobalContext } from "../../state/context";

interface SpotifyProps {
  setSpotify: Dispatch<SetStateAction<SpotifyPlayer | undefined>>;
}

export const Spotify: React.FC<SpotifyProps> = ({ setSpotify }) => {
  const userInfo = useAuth();
  const { dispatch, state } = useGlobalContext();
  const ref = useRef<SpotifyPlayer>(null);

  const handleCallback = (callbackState: CallbackState) => {
    // console.log(callbackState);
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
      ref.current?.setState({ needsUpdate: true });
    }
    if (ref.current?.state.isPlaying) {
      console.log("spotify playing");
      dispatch({ type: "PLAY", payload: {} });
    }

    if (callbackState.error) {
      console.error(callbackState);
    }
  };

  const uri =
    state.player.currentService === "spotify"
      ? state.player.currentSong?.uri
      : undefined;
  // console.log(uri);

  if (userInfo?.access_token) {
    return (
      <>
        <SpotifyPlayer
          token={userInfo.access_token}
          name="plaaaylist player"
          uris={uri}
          callback={handleCallback}
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

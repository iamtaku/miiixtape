import React, { Dispatch, SetStateAction, useRef } from "react";
import { Redirect } from "react-router";
import SpotifyPlayer, { CallbackState } from "react-spotify-web-playback";
import { useGlobalContext } from "../../state/context";

interface SpotifyProps {
  setSpotify: Dispatch<SetStateAction<SpotifyPlayer | undefined>>;
  uri?: string;
  token: string;
}

export const Spotify: React.FC<SpotifyProps> = ({ setSpotify, token, uri }) => {
  const { dispatch, state } = useGlobalContext();
  const ref = useRef<SpotifyPlayer>(null);

  const handleCallback = (state: CallbackState) => {
    console.log(state);
    if (
      state.type === "player_update" &&
      state.isPlaying === false &&
      state.position === 0
    ) {
      dispatch({
        type: "SONG_END",
        payload: {},
      });
      dispatch({
        type: "SET_NEXT",
        payload: {},
      });
      dispatch({
        type: "PLAY",
        payload: {},
      });
    }

    if (state.error) {
      console.error(state);
      debugger;
      <Redirect to="/app/error" />;
    }
  };

  return (
    <>
      <SpotifyPlayer
        token={token}
        name="plaaaylist player"
        // uris={state.player.currentSong ? state.player.currentSong.uri : ""}

        uris={uri}
        callback={handleCallback}
        play={
          state.player.isPlaying &&
          state.player.currentSong?.service === "spotify"
        }
        ref={ref}
      />
    </>
  );
};

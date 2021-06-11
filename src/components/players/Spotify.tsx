import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { Redirect } from "react-router";
import SpotifyPlayer, { CallbackState } from "react-spotify-web-playback";
import { useGlobalContext } from "../../state/context";

interface SpotifyProps {
  setSpotify: Dispatch<SetStateAction<SpotifyPlayer | undefined>>;
  token: string;
}

export const Spotify: React.FC<SpotifyProps> = ({ setSpotify, token }) => {
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
      <Redirect to="/app/error" />;
    }
  };

  return (
    <>
      <SpotifyPlayer
        token={token}
        name="plaaaylist player"
        uris={state.player.currentSong ? state.player.currentSong.uri : ""}
        callback={handleCallback}
        play={
          state.player.isPlaying && state.player.currentService === "spotify"
        }
        ref={ref}
      />
    </>
  );
};

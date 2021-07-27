import React, { Dispatch, SetStateAction, useRef } from "react";
import { useQueryClient } from "react-query";
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
  const queryClient = useQueryClient();

  const handleCallback = (state: CallbackState) => {
    ref.current && setSpotify(ref.current);
    if (state.isInitializing) {
      dispatch({ type: "IS_LOADING", payload: {} });
    }

    if (state.isPlaying && !state.isInitializing && state.status === "READY") {
      dispatch({ type: "LOADING_FINISH", payload: {} });
    }
    if (state.track.durationMs > 0) {
    }
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
      console.log("refetching token");
      queryClient.invalidateQueries(["user"]);
      state.needsUpdate = true;
    }
  };

  return (
    <>
      <SpotifyPlayer
        token={token}
        name="plaaaylist player"
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

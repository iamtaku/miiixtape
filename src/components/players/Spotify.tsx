import React from "react";
import SpotifyPlayer, { CallbackState } from "react-spotify-web-playback";
import { useGlobalContext } from "../../state/context";
interface SpotifyProps {
  token?: string;
  uris: string;
  play: boolean;
}

export const Spotify: React.FC<SpotifyProps> = ({ token, uris, play }) => {
  const { dispatch, state } = useGlobalContext();
  const handleCallback = (state: CallbackState) => {
    console.log(state);
    if (
      state.position === 0 &&
      state.progressMs === 0 &&
      state.previousTracks[0]
    ) {
      console.log("song finnished!");
      dispatch({
        type: "PLAY_NEXT",
        payload: {},
      });
    }
  };
  if (token) {
    return (
      <SpotifyPlayer
        token={token}
        play={play}
        name="plaaaylist player"
        uris={uris}
        callback={handleCallback}
      />
    );
  }

  return <h1>Error4</h1>;
};

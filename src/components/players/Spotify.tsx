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

  const handleCallback = (state: CallbackState) => {
    if (
      state.type === "player_update" &&
      state.isPlaying === false &&
      state.position === 0
    ) {
      dispatch({
        type: "PLAY_NEXT",
        payload: {},
      });
    }
  };

  if (userInfo?.access_token) {
    return (
      <>
        <SpotifyPlayer
          token={userInfo.access_token}
          name="plaaaylist player"
          uris={
            state.player.currentService === "spotify" &&
            state.player.currentSong
              ? state.player.currentSong.uri
              : ""
          }
          callback={handleCallback}
          autoPlay={true}
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

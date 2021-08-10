import React, { Dispatch, SetStateAction, useRef } from "react";
import { useQueryClient } from "react-query";
import SpotifyPlayer, { CallbackState } from "react-spotify-web-playback";
import styled from "styled-components";
import client from "../../queries/api/spotify/api";
import { useGetUser } from "../../queries/hooks";
import { fetchVolume, useGlobalContext } from "../../state/context";

const Wrapper = styled.div`
  display: none;
`;

interface SpotifyProps {
  setSpotify: Dispatch<SetStateAction<SpotifyPlayer | undefined>>;
}

export const Spotify: React.FC<SpotifyProps> = ({ setSpotify }) => {
  const { data: userInfo } = useGetUser();
  const { dispatch, state } = useGlobalContext();
  const ref = useRef<SpotifyPlayer>(null);
  const queryClient = useQueryClient();

  if (!userInfo) return null;

  const handleCallback = (state: CallbackState) => {
    ref.current && setSpotify(ref.current);
    if (state.isInitializing) {
      dispatch({ type: "IS_LOADING", payload: {} });
    }

    if (state.isPlaying && !state.isInitializing && state.status === "READY") {
      dispatch({ type: "LOADING_FINISH", payload: {} });
      client(userInfo?.access_token).setVolume(fetchVolume());
      dispatch({ type: "PLAY", payload: {} });
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
    <Wrapper>
      <SpotifyPlayer
        token={userInfo.access_token}
        name="plaaaylist player"
        uris={state.player.currentSong?.uri}
        callback={handleCallback}
        play={
          state.player.isPlaying &&
          state.player.currentSong?.service === "spotify"
        }
        ref={ref}
        initialVolume={0}
      />
    </Wrapper>
  );
};

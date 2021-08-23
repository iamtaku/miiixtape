import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { useEffect } from "react";
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
  const [isPlaying, setIsPlaying] = useState(false);
  const ref = useRef<SpotifyPlayer>(null);
  const queryClient = useQueryClient();

  if (!userInfo) return null;

  useEffect(() => {
    if (!ref.current) return;
    if (state.player.isPlaying) {
      setIsPlaying(true);
    }

    if (!state.player.isPlaying) {
      setIsPlaying(false);
    }
  }, [state.player.currentSong, state.player.isPlaying]);

  const handleCallback = (callbackState: CallbackState) => {
    console.log(callbackState);
    ref.current && setSpotify(ref.current);
    if (callbackState.isInitializing) {
      dispatch({ type: "IS_LOADING", payload: {} });
    }

    if (
      callbackState.isPlaying &&
      !callbackState.isInitializing &&
      callbackState.status === "READY"
    ) {
      dispatch({ type: "LOADING_FINISH", payload: {} });
      client(userInfo?.access_token).setVolume(fetchVolume());
      dispatch({ type: "PLAY", payload: {} });
    }

    // when current playback finishes
    if (
      callbackState.type === "player_update" &&
      !callbackState.isPlaying &&
      callbackState.progressMs === 0 &&
      state.player.nextSong
    ) {
      dispatch({
        type: "SONG_END",
        payload: {},
      });
      setIsPlaying(false);
      dispatch({
        type: "SET_NEXT",
        payload: {},
      });
      dispatch({
        type: "PLAY",
        payload: {},
      });
      setIsPlaying(true);
    }

    if (callbackState.error) {
      console.error(state);
      console.log("refetching token");
      queryClient.invalidateQueries(["user"]);
      callbackState.needsUpdate = true;
    }
  };

  return (
    <Wrapper>
      <SpotifyPlayer
        token={userInfo.access_token}
        name="plaaaylist player"
        uris={state.player.currentSong?.uri}
        callback={handleCallback}
        play={isPlaying}
        ref={ref}
        initialVolume={0}
      />
    </Wrapper>
  );
};

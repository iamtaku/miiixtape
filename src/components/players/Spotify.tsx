import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import SpotifyPlayer, { CallbackState } from "react-spotify-web-playback";
import { useGetUser } from "../../queries/hooks/plaaaylist";
import { useGlobalContext } from "../../state/context";

interface SpotifyProps {
  setSpotify: Dispatch<SetStateAction<SpotifyPlayer | undefined>>;
}

export const Spotify: React.FC<SpotifyProps> = ({ setSpotify }) => {
  const { data: userInfo } = useGetUser();
  const { dispatch, state } = useGlobalContext();
  const ref = useRef<SpotifyPlayer>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => setPlay(true), [state]);

  const handleCallback = (state: CallbackState) => {
    console.log(state);
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
    if (!state.isPlaying) setPlay(false);

    // if (state.player.currentService !== "spotify") {
    //   ref.current?.setState({ needsUpdate: true });
    // }
    // if (ref.current?.state.isPlaying) {
    //   console.log("spotify playing");
    //   dispatch({ type: "PLAY", payload: {} });
    // }

    if (state.error) {
      console.error(state);
    }
  };

  useEffect(() => {
    if (
      state.player.currentService === "spotify" &&
      state.player.currentSong?.uri
    ) {
      console.log("setting spotify song: ", state.player.currentSong.name);
    }
  }, [state.player.currentSong, state.player.currentService]);

  if (!userInfo?.access_token) return null;

  return (
    <>
      <SpotifyPlayer
        token={userInfo.access_token}
        name="plaaaylist player"
        uris={
          state.player.currentService === "spotify"
            ? state.player.currentSong?.uri
            : undefined
        }
        callback={handleCallback}
        play={
          state.player.currentService === "spotify" && state.player.isPlaying
        }
        ref={ref}
        autoPlay={true}
      />
    </>
  );
};

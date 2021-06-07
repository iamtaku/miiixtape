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
  const [uri, setUri] = useState("");
  const ref = useRef<SpotifyPlayer>(null);

  useEffect(() => {
    if (
      state.player.currentService === "spotify" &&
      state.player.currentSong?.uri
    ) {
      console.log("setting spotify uri: ", uri);
      setUri(state.player.currentSong?.uri);
    }
  }, [state]);

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
          autoPlay={true}
        />
      </>
    );
  }

  return <h1>Error</h1>;
};

import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import SpotifyPlayer, { CallbackState } from "react-spotify-web-playback";
import { reduceEachTrailingCommentRange } from "typescript";
import { useGlobalContext } from "../../state/context";
interface SpotifyProps {
  token?: string;
  uris: string | string[];
  play: boolean;
  setSpotify: Dispatch<SetStateAction<SpotifyPlayer | undefined>>;
}

export const Spotify: React.FC<SpotifyProps> = ({
  token,
  uris,
  play,
  setSpotify,
}) => {
  const { dispatch, state } = useGlobalContext();
  const [isPlaying, setIsPlaying] = useState(false);
  const ref = useRef<SpotifyPlayer>(null);
  const handleCallback = (state: CallbackState) => {
    console.log(state);
    // if(state.status === )
    // console.log(state);
    // if (state.status === "READY" && ref.current) {
    //   setSpotify(ref.current);
    // }
    // if (
    //   state.position === 0 &&
    //   state.progressMs === 0 &&
    //   state.previousTracks[0]
    // ) {
    //   // state.isPlaying = false;
    // }
    // if (state.type === "track_update") {
    //   console.log("track update");
    //
    if (state.type === "player_update" && state.isPlaying === false) {
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
        name="plaaaylist player"
        uris={uris}
        callback={handleCallback}
        autoPlay={true}
        play={play}
        ref={ref}
      />
    );
  }

  return <h1>Error</h1>;
};

import React, { useState } from "react";
import { Spotify } from "./Spotify";
import styled from "styled-components";
import { GetUser } from "../../queries/hooks/GetUser";
import { useGlobalContext } from "../../state/context";
import { Youtube } from "./Youtube";
import { Controls } from "./Controls";
import SpotifyWebPlayer from "react-spotify-web-playback/lib";
import { SSL_OP_NO_TLSv1_1 } from "node:constants";

const PlayerWrapper = styled.div`
  grid-area: player;
`;
const Player = () => {
  const { data, isLoading, error } = GetUser();
  const { state, dispatch } = useGlobalContext();
  const [youtube, setYoutube] = useState<any>();
  const [spotify, setSpotify] = useState<SpotifyWebPlayer | undefined>();

  return (
    <PlayerWrapper>
      {state.player.isPlaying ? (
        <h2>Playing {state.player.currentService}</h2>
      ) : (
        <h2>paused...</h2>
      )}
      <Controls youtube={youtube} spotify={spotify} />
      <Youtube
        id={
          state.player.currentService === "youtube" &&
          state.player.currentSong.uri
        }
        play={
          state.player.isPlaying && state.player.currentService === "youtube"
        }
        setYoutube={setYoutube}
      />
      {/* <button onClick={() => {
        dispatch({type: 'PLAY_PLAYLIST', payload: {id: '1', tracks: [{id: '2', name: 'high and dry', service: 'spotify', uri: }] }})
      }}>Play</button> */}
      <Spotify
        token={data?.access_token}
        // uris={state.player.playlistTracks
        //   .filter((item) => item.service === "spotify")
        //   .map((item) => item.uri)}
        uris={
          state.player.currentService === "spotify"
            ? state.player.currentSong.uri
            : ""
        }
        play={
          state.player.isPlaying && state.player.currentService === "spotify"
        }
        setSpotify={setSpotify}
      />
    </PlayerWrapper>
  );
};

export default Player;

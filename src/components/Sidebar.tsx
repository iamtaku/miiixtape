import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GetAllPlaylists } from "../queries/hooks/GetAllPlaylists";
import { GetAllSpotifyPlaylist } from "../queries/hooks/GetAllSpotifyPlaylists";
import { GetSinglePlaylist } from "../queries/hooks/GetSinglePlaylist";
import { GetUser } from "../queries/hooks/GetUser";
import { useGlobalContext } from "../state/context";
import { Song } from "../types/types";

const SidebarWrapper = styled.div`
  grid-area: sidebar;
  /* display: flex; */
  /* flex-direction: column; */
  border-right: 1px solid white;
  span {
    font-size: 1.2rem;
    text-transform: uppercase;
    opacity: 0.8;
  }
`;

const PlaylistItem = styled.div`
  width: inherit;
  /* display: grid; */
  /* grid-template-columns: 0.7fr 0.3fr; */
  /* grid-template-columns: 1fr 1fr; */
  /* display: flex; */
  /* justify-content: space-between; */
`;

export const Sidebar = () => {
  const { data: userInfo } = GetUser();
  const { data: spotifyPlaylists } = GetAllSpotifyPlaylist(userInfo);
  const { data: playlists, isLoading, error } = GetAllPlaylists();
  const { state, dispatch } = useGlobalContext();
  const test: Song[] = [
    {
      id: "1",
      name: "test song",
      service: "spotify",
      uri: "spotify:track:5RtbColbiZvNPRqYeSdf1o",
    },
    {
      id: "2",
      name: "test 2 song",
      service: "youtube",
      uri: "FBuQDijUme4",
    },
  ];
  const handleClick = (id: string) => {
    // event?.preventDefault();
    // console.log(event);
    // const { data: playlist } = GetSinglePlaylist(id);
    console.log(id);

    // const payload = {
    //   id,
    //   tracks,
    // };
    // dispatch({
    //   type: "PLAY_PLAYLIST",
    //   payload,
    // });
  };
  return (
    <SidebarWrapper>
      <p>
        <span>Spotify Playlists</span>
      </p>
      {spotifyPlaylists?.items.map((item) => {
        return (
          <PlaylistItem>
            <Link to={`/app/playlist/spotify/${item.id}`}>{item.name}</Link>
            {/* <button
              onClick={() =>
                dispatch({
                  type: "PLAY_PLAYLIST",
                  payload: { id: "1", tracks: test },
                })
              }
            > */}
            {/* Play */}
            {/* </button>
            <button onClick={() => handleClick(item.id)}>Play</button> */}
          </PlaylistItem>
        );
      })}
      <p>
        <span>Plaaaylist Playlists</span>
      </p>
      {playlists?.map((item) => (
        <PlaylistItem>
          <Link to={`/app/playlist/plaaaylist/${item.playlistInfo.id}`}>
            {item.playlistInfo.name}
          </Link>
        </PlaylistItem>
      ))}
    </SidebarWrapper>
  );
};

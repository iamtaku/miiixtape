import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Spotify } from "../../queries/api";
import client from "../../queries/api/spotify/api";
import {
  useGetAllSpotifyPlaylist,
  useGetUser,
  usePostPlaylistItems,
} from "../../queries/hooks";
import { PlaylistInfo, PlaylistParam } from "../../types/types";

const Container = styled.div`
  padding: 4px;
`;

const List = styled.ul``;

const Title = styled.h3`
  font-weight: 400;
  opacity: 0.8;
`;

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 2px 26px;
  border: 1px solid transparent;

  p {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  &:hover {
    background: var(--light-gray);
    border: 1px solid var(--light-gray);
    border-radius: 4px;
    /* cursor: pointer; */

    button {
      display: initial !important;
      color: var(--secondary);
    }
  }
`;

const FetchButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: var(--accent) !important;
  opacity: 1 !important;
  width: auto !important;
  flex-grow: 0.5;
  &:hover {
    cursor: pointer;
  }
`;

export const AddbyExisting = () => {
  const params = useParams<PlaylistParam>();
  const { data: spotifyPlaylists, isLoading } = useGetAllSpotifyPlaylist();
  const { data: userInfo } = useGetUser();
  const mutation = usePostPlaylistItems();
  const handleClick = async (playlistInfo: PlaylistInfo) => {
    // debugger;
    if (!userInfo) return;
    const playlist = await Spotify.getPlaylist(
      playlistInfo?.id,
      client(userInfo?.access_token)
    );
    mutation
      .mutateAsync({ id: params.id, tracks: playlist.tracks })
      .then(() => console.log("tracks added success"));
  };

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <>
      {spotifyPlaylists && spotifyPlaylists.length > 0 ? (
        <List>
          {spotifyPlaylists.map((playlist) => {
            return (
              <Item key={playlist.playlistInfo.id}>
                <p>{playlist.playlistInfo.name}</p>
                <FetchButton onClick={() => handleClick(playlist.playlistInfo)}>
                  ADD
                </FetchButton>
              </Item>
            );
          })}
        </List>
      ) : (
        <p style={{ padding: "2px 24px" }}>
          You don't have any spotify playlists to import
        </p>
      )}
    </>
  );
};

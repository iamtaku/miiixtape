import React from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { Spotify } from "../../queries/api";
import client from "../../queries/api/spotify/api";
import {
  useGetAllSpotifyPlaylist,
  useGetUser,
  usePostPlaylistItems,
} from "../../queries/hooks";
import { PlaylistInfo, PlaylistParam } from "../../types/types";

interface IAddByExisting {
  // handleClick:(id: string)  => void,
  // playlists: Collection[]
}

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
    background: var(--accent);
    border: 1px solid var(--accent);
    border-radius: 4px;
    cursor: pointer;

    span {
      display: initial !important;
      color: var(--secondary);
    }
  }
`;

export const AddbyExisting: React.FC<IAddByExisting> = () => {
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
      .mutateAsync({ id: params.playlistId, tracks: playlist.tracks })
      .then(() => console.log("tracks added success"));
  };

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <div>
      <h3>Import Existing Playlists</h3>
      {spotifyPlaylists && spotifyPlaylists.length > 0 ? (
        <ul>
          {spotifyPlaylists.map((playlist) => {
            return (
              <Item key={playlist.playlistInfo.id}>
                <p>{playlist.playlistInfo.name}</p>
                <span
                  onClick={() => handleClick(playlist.playlistInfo)}
                  style={{ display: "none" }}
                >
                  ADD
                </span>
              </Item>
            );
          })}
        </ul>
      ) : (
        <p style={{ padding: "2px 24px" }}>
          You don't have any spotify playlists to import
        </p>
      )}
    </div>
  );
};

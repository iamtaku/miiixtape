import React from "react";
import { useParams } from "react-router";
import { Spotify } from "../../queries/api";
import client from "../../queries/api/spotify/api";
import {
  useGetAllPlaylists,
  useGetAllSpotifyPlaylist,
  useGetArtist,
  useGetUser,
  usePostPlaylistItems,
} from "../../queries/hooks";
import {
  Collection,
  PlaylistInfo,
  PlaylistParam,
  Tracks,
} from "../../types/types";

interface IAddByExisting {
  // handleClick:(id: string)  => void,
  // playlists: Collection[]
}
export const AddbyExisting: React.FC<IAddByExisting> = () => {
  const params = useParams<PlaylistParam>();
  const { data: playlists } = useGetAllPlaylists();
  const { data: spotifyPlaylists, isLoading } = useGetAllSpotifyPlaylist();
  const { data: userInfo } = useGetUser();
  const mutation = usePostPlaylistItems();
  const handleClick = async (playlistInfo: PlaylistInfo) => {
    // debugger;
    if (!userInfo) return;
    const playlist = await Spotify.getPlaylist(
      playlistInfo.id,
      client(userInfo?.access_token)
    );
    mutation
      .mutateAsync({ id: params.playlistId, tracks: playlist.tracks })
      .then(() => console.log("tracks added success"));
  };

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <div>
      <h3>Import Existing</h3>
      {spotifyPlaylists && (
        <ul>
          {spotifyPlaylists.map((playlist) => {
            return (
              <li
                key={playlist.playlistInfo.id}
                onClick={() => handleClick(playlist.playlistInfo)}
              >
                <p>{playlist.playlistInfo.name}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

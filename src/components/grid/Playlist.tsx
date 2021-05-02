import React from "react";
import { useParams } from "react-router-dom";
import { GetSpotifyPlaylist } from "../../queries/GetSpotifyPlaylist";
import { GetUser } from "../../queries/GetUser";
interface PlaylistParam {
  playlist: string;
}
export const Playlist = () => {
  const { playlist } = useParams<PlaylistParam>();
  console.log(playlist);
  const { data: userInfo } = GetUser();
  const { data, isLoading, error } = GetSpotifyPlaylist(playlist, userInfo);
  console.log(data);
  return (
    <div>
      <h1>this is the playlist page!</h1>
      {data?.tracks.items.map((item, index) => {
        return <p key={index}>{item.track.name}</p>;
      })}
    </div>
  );
};

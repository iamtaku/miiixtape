import React from "react";
import { useParams } from "react-router-dom";
import { GetSpotifyPlaylist } from "../../queries/GetSpotifyPlaylist";
import { GetUser } from "../../queries/GetUser";
import { InnerGridBottom } from "../InnerGridBottom";
import { InnerGridLayout } from "../InnerGridLayout";
import { InnerGridTop } from "../InnerGridTop";
interface PlaylistParam {
  playlist: string;
}
export const Playlist = () => {
  const { playlist } = useParams<PlaylistParam>();
  const { data: userInfo } = GetUser();
  const { data, isLoading, error } = GetSpotifyPlaylist(playlist, userInfo);
  console.log(data);

  return (
    <InnerGridLayout>
      <InnerGridTop />
      <p>this is the playlist page!</p>
      <InnerGridBottom data={data} />
      {data?.tracks.items.map((item, index) => {
        return <p key={index}>{item.track.name}</p>;
      })}
    </InnerGridLayout>
  );
};

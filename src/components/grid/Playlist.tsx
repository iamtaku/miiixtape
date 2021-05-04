import React from "react";
import { useParams } from "react-router-dom";
import { GetSpotifyPlaylist } from "../../queries/GetSpotifyPlaylist";
import { GetUser } from "../../queries/GetUser";
import { InnerGridBottom } from "./InnerGridBottom";
import { InnerGridLayout } from "./InnerGridLayout";
import { InnerGridTop } from "./InnerGridTop";
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
      <InnerGridTop data={data} pageType={playlist} />
      <InnerGridBottom data={data} />
    </InnerGridLayout>
  );
};

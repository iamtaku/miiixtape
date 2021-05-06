import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { GetPlaylists } from "../../queries/GetAllPlaylists";
import { GetPlaylist } from "../../queries/GetPlaylist";
import { GetSpotifyPlaylist } from "../../queries/GetSpotifyPlaylist";
import { GetUser } from "../../queries/GetUser";
import { Service } from "../../queries/types";
import { InnerGridBottom } from "./InnerGridBottom";
import { InnerGridLayout } from "./InnerGridLayout";
import { InnerGridTop } from "./InnerGridTop";
interface PlaylistParam {
  playlistId: string;
  service: Service;
}
export const Playlist = () => {
  const { playlistId, service } = useParams<PlaylistParam>();
  // const location = useLocation();
  // const history = useHistory();
  // console.log(history);
  // console.log(location);
  const { data: userInfo } = GetUser();
  // const { data, isLoading, error } = GetSpotifyPlaylist(playlistId, userInfo);
  const { data, isLoading, error } = GetPlaylist(playlistId, service, userInfo);
  console.log(data);
  // const [dataTop, setDataTop] = useState();
  // const [dataBottom, setDataBottom] = useState();
  return (
    <InnerGridLayout>
      <InnerGridTop data={data} />
      <InnerGridBottom data={data} />
    </InnerGridLayout>
  );
};

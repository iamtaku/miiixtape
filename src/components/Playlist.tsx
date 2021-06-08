import React from "react";
import { useHistory } from "react-router";
import { useGetSinglePlaylist } from "../queries/hooks/plaaaylist";
import { InnerGridBottom } from "./grid/bottom/InnerGridBottom";
import { InnerGridTop } from "./grid/top/InnerGridTop";
import { useQueryClient } from "react-query";
import { Playlist as PlaylistType } from "../types/types";

export const Playlist: React.FC = () => {
  const { data, isLoading, error } = useGetSinglePlaylist();
  const history = useHistory();
  const queryClient = useQueryClient();
  const test = queryClient.getQueryData<PlaylistType>([
    "playlist",
    { playlistId: data?.playlistInfo.id, service: data?.playlistInfo.service },
  ]);
  console.log("playist : ", test?.playlistInfo.name);

  if (error) {
    console.log(error);
    history.push("/app/error");
  }

  return (
    <>
      <InnerGridTop data={data} isLoading={isLoading} />
      <InnerGridBottom data={data} isLoading={isLoading} />
    </>
  );
};

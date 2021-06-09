import React from "react";
import { useHistory, useParams } from "react-router";
import { useGetSinglePlaylist } from "../queries/hooks";
import { InnerGridBottom } from "./grid/bottom/InnerGridBottom";
import { InnerGridTop } from "./grid/top/InnerGridTop";
import { useQueryClient } from "react-query";
import { Playlist as PlaylistType, PlaylistParam } from "../types/types";
import { InnerLayout } from "./Layout";

export const Playlist: React.FC = () => {
  const params = useParams<PlaylistParam>();
  const { data, isLoading, error } = useGetSinglePlaylist(
    params.playlistId,
    params.service
  );
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
    <InnerLayout>
      <InnerGridTop data={data} isLoading={isLoading} />
      <InnerGridBottom data={data} isLoading={isLoading} />
    </InnerLayout>
  );
};

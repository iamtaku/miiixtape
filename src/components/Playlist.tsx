import React from "react";
import { useHistory } from "react-router";
import { GetSinglePlaylist } from "../queries/hooks/GetSinglePlaylist";
import { InnerGridBottom } from "./grid/bottom/InnerGridBottom";
import { Layout } from "./Layout";
import { InnerGridTop } from "./grid/top/InnerGridTop";
import { InnerLayout } from "./grid/InnerLayout";
import { useQueryClient } from "react-query";
import { Playlist as PlaylistType } from "../types/types";

export const Playlist: React.FC = () => {
  const { data, isLoading, error } = GetSinglePlaylist();
  const history = useHistory();
  const queryClient = useQueryClient();
  const test = queryClient.getQueryData<PlaylistType>([
    "playlist",
    { playlistId: data?.playlistInfo.id, service: data?.playlistInfo.service },
  ]);
  console.log(test?.playlistInfo.name);

  if (error) {
    console.log(error);
    history.push("/app/error");
  }

  return (
    <Layout>
      <InnerLayout>
        <InnerGridTop data={data} isLoading={isLoading} />
        <InnerGridBottom data={data} isLoading={isLoading} />
      </InnerLayout>
    </Layout>
  );
};

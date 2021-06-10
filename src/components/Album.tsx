import React from "react";
import { Redirect, useHistory } from "react-router";
import { InnerGridTop } from "./grid/top/InnerGridTop";
import { InnerGridBottom } from "./grid/bottom/InnerGridBottom";
import { useQueryClient } from "react-query";
import { useGetAlbum } from "../queries/hooks";
import { InnerLayout } from "./Layout";

export const Album = ({ id }: { id?: string }) => {
  const { data, isLoading, error } = useGetAlbum();
  const queryClient = useQueryClient();
  const test = queryClient.getQueryData([
    "album",
    { albumId: data?.playlistInfo.id, service: "spotify" },
  ]);
  console.log(test);

  if (error) {
    console.error(error);
    <Redirect to="/app/error" />;
  }

  return (
    <InnerLayout>
      <InnerGridTop data={data} isLoading={isLoading} />
      <InnerGridBottom data={data} isLoading={isLoading} />
    </InnerLayout>
  );
};

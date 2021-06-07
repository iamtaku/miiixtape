import React from "react";
import { useHistory } from "react-router";
import { InnerGridTop } from "./grid/top/InnerGridTop";
import { InnerGridBottom } from "./grid/bottom/InnerGridBottom";
import { useQueryClient } from "react-query";
import { useGetAlbum } from "../queries/hooks/plaaaylist";

export const Album = ({ id }: { id?: string }) => {
  const { data, isLoading, error } = useGetAlbum();
  const history = useHistory();
  const queryClient = useQueryClient();
  const test = queryClient.getQueryData([
    "album",
    { albumId: data?.playlistInfo.id, service: "spotify" },
  ]);
  console.log(test);

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

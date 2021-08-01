import React from "react";
import { Redirect } from "react-router";
import { InnerGridBottom } from "./grid/bottom/index";
// import { useQueryClient } from "react-query";
import { useGetAlbum } from "../queries/hooks";

export const Album = ({ id }: { id?: string }) => {
  const { data, isLoading, error, isError } = useGetAlbum();
  // const test = queryClient.getQueryData<Collection>([
  //   "playlist",
  //   { id: data?.playlistInfo.id, service: "spotify" },
  // ]);
  // console.log(test);

  if (isError) {
    console.error(error);
    <Redirect to="/app/error" />;
  }

  return (
    <InnerGridBottom data={data} isLoading={isLoading} isError={isError} />
  );
};

import React from "react";
import { Redirect } from "react-router";
import { InnerGridBottom } from "./grid/bottom/index";
import { useQueryClient } from "react-query";
import { useGetAlbum } from "../queries/hooks";
import { Collection } from "../types/types";

export const Album = ({ id }: { id?: string }) => {
  const { data, isLoading, error } = useGetAlbum();
  const queryClient = useQueryClient();
  const test = queryClient.getQueryData<Collection>([
    "playlist",
    { id: data?.playlistInfo.id, service: "spotify" },
  ]);
  console.log(test);

  if (error) {
    console.error(error);
    <Redirect to="/app/error" />;
  }

  return <InnerGridBottom data={data} isLoading={isLoading} />;
};

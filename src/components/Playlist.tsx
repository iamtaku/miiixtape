import React from "react";
import { useHistory, useParams } from "react-router";
import { useGetSinglePlaylist } from "../queries/hooks";
import { InnerGridBottom } from "./grid/bottom";
import { useQueryClient } from "react-query";
import { Collection as PlaylistType, PlaylistParam } from "../types/types";

export const Playlist: React.FC = () => {
  const { data, isLoading, error } = useGetSinglePlaylist();
  const history = useHistory();
  const queryClient = useQueryClient();
  const test = queryClient.getQueryData<PlaylistType>([
    "playlist",
    { playlistId: data?.playlistInfo.id, service: data?.playlistInfo.service },
  ]);
  // console.log("playist : ", test?.playlistInfo.name);

  if (error) {
    console.log(error);
    history.push("/app/error");
  }

  return <InnerGridBottom data={data} isLoading={isLoading} />;
};

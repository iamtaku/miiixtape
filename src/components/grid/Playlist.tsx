import React, { useState } from "react";
import { useHistory } from "react-router";
import { GetSinglePlaylist } from "../../queries/hooks/GetSinglePlaylist";
import { Service } from "../../types/types";
import { InnerGridBottom } from "./InnerGridBottom";
import { InnerGridLayout } from "./InnerGridLayout";
import { InnerGridTop } from "./InnerGridTop";

export interface PlaylistParam {
  playlistId: string;
  service: Service;
}
export const Playlist = () => {
  const { data, isLoading, error } = GetSinglePlaylist();
  const history = useHistory();
  if (error) {
    history.push("/app/error");
  }

  return (
    <InnerGridLayout>
      <InnerGridTop data={data?.playlistInfo} tracks={data?.tracks} />
      <InnerGridBottom data={data?.tracks} />
    </InnerGridLayout>
  );
};

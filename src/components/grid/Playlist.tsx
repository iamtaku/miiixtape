import React, { useState } from "react";
import { useParams } from "react-router";
import { GetSinglePlaylist } from "../../queries/hooks/GetSinglePlaylist";
import { Service } from "../../types/types";
import { InnerGridBottom } from "./InnerGridBottom";
import { InnerGridLayout } from "./InnerGridLayout";
import { InnerGridTop } from "./InnerGridTop";

interface PlaylistParam {
  playlistId: string;
  service: Service;
}
export const Playlist = () => {
  const params = useParams<PlaylistParam>();
  const { data, isLoading, error } = GetSinglePlaylist(params);

  return (
    <InnerGridLayout>
      <InnerGridTop data={data?.playlistInfo} tracks={data?.tracks} />
      <InnerGridBottom data={data?.tracks} />
    </InnerGridLayout>
  );
};

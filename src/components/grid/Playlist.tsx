import React, { useState } from "react";
import { GetSinglePlaylist } from "../../queries/hooks/GetSinglePlaylist";
import { InnerGridBottom } from "./InnerGridBottom";
import { InnerGridLayout } from "./InnerGridLayout";
import { InnerGridTop } from "./InnerGridTop";
export const Playlist = () => {
  const { data, isLoading, error } = GetSinglePlaylist();

  console.log("playlist", data);
  return (
    <InnerGridLayout>
      <InnerGridTop data={data?.playlistInfo} tracks={data?.tracks} />
      <InnerGridBottom data={data?.tracks} />
    </InnerGridLayout>
  );
};

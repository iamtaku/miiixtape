import React, { useEffect, useState } from "react";
import { GetSinglePlaylist } from "../../queries/GetSinglePlaylist";
import { InnerGridBottom } from "./InnerGridBottom";
import { InnerGridLayout } from "./InnerGridLayout";
import { InnerGridTop } from "./InnerGridTop";
export const Playlist = () => {
  const { data, isLoading, error } = GetSinglePlaylist();

  console.log("playlist", data);
  return (
    <InnerGridLayout>
      <InnerGridTop data={data} />
      <InnerGridBottom data={data} />
    </InnerGridLayout>
  );
};

import React from "react";
import { useGetSinglePlaylist } from "../../queries/hooks";
import { Bottom } from "../grid/Bottom";

export const Playlist: React.FC = () => {
  const { data, isLoading, error } = useGetSinglePlaylist();

  return <Bottom data={data} isLoading={isLoading} error={error} />;
};

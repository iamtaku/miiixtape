import React from "react";
import { useGetSinglePlaylist } from "../../queries/hooks";
import { Bottom } from "../grid/Bottom";

export const Playlist: React.FC = () => {
  const { data, isLoading, error, isError } = useGetSinglePlaylist();

  if (isError) {
    console.log(error);
    return <p>error</p>;
  }

  return <Bottom data={data} isLoading={isLoading} isError={isError} />;
};

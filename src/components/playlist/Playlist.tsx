import React from "react";
import { useGetSinglePlaylist } from "../../queries/hooks";
import { InnerGridBottom } from "../grid/bottom";

export const Playlist: React.FC = () => {
  const { data, isLoading, error, isError } = useGetSinglePlaylist();

  if (isError) {
    console.log(error);
    return <p>error</p>;
  }

  return (
    <>
      <InnerGridBottom data={data} isLoading={isLoading} isError={isError} />
    </>
  );
};

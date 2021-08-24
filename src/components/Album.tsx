import React from "react";
import { Bottom } from "./grid/Bottom";
import { useGetAlbum } from "../queries/hooks";

export const Album = (): JSX.Element => {
  const { data, isLoading, error } = useGetAlbum();

  return (
    <>
      <Bottom data={data} isLoading={isLoading} error={error} />
    </>
  );
};

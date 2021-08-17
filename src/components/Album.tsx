import React from "react";
import { Redirect } from "react-router-dom";
import { Bottom } from "./grid/Bottom";
import { useGetAlbum } from "../queries/hooks";

export const Album = (): JSX.Element => {
  const { data, isLoading, error, isError } = useGetAlbum();

  if (isError) {
    console.error(error);
    <Redirect to="/app/error" />;
  }

  return (
    <>
      <Bottom data={data} isLoading={isLoading} isError={isError} />
    </>
  );
};

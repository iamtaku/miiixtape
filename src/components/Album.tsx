import React from "react";
import { Redirect } from "react-router-dom";
import { InnerGridBottom } from "./grid/bottom/index";
import { useGetAlbum } from "../queries/hooks";
import { InnerGridTop } from "./grid/top";

export const Album = () => {
  const { data, isLoading, error, isError } = useGetAlbum();

  if (isError) {
    console.error(error);
    <Redirect to="/app/error" />;
  }

  return (
    <>
      <InnerGridBottom data={data} isLoading={isLoading} isError={isError} />
    </>
  );
};

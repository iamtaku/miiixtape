import React from "react";
import { useParams } from "react-router-dom";
import { useGetArtist } from "../../queries/hooks";
import { ArtistParams } from "../../queries/api";
import { ArtistGridBottom } from "./ArtistGridBottom";

export const Artist = (): JSX.Element => {
  const params = useParams<ArtistParams>();
  const { data, isLoading, error } = useGetArtist(params);

  if (error?.message !== "something gone wrong")
    return <p>something gone wrong</p>;
  if (!data || isLoading) return <h2>loading...</h2>;
  return (
    <ArtistGridBottom
    // data={data} isLoading={isLoading}
    />
  );
};

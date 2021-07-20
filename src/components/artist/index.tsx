import React from "react";
import { useParams } from "react-router";
import { useGetArtist } from "../../queries/hooks";
import { ArtistParams } from "../../queries/api";
import { ArtistGridBottom } from "./ArtistGridBottom";

export const Artist = () => {
  const params = useParams<ArtistParams>();
  const { data, isLoading, isError } = useGetArtist(params);
  console.log(data, isError);

  if (isError) return <p>something gone wrong</p>;
  if (!data || isLoading) return <h2>loading...</h2>;
  return (
    <ArtistGridBottom
    // data={data} isLoading={isLoading}
    />
  );
};

import React from "react";
import { useParams } from "react-router";
import { useGetArtist } from "../../queries/hooks";
import { ArtistParams } from "../../queries/api";
import { ArtistGridBottom } from "./ArtistGridBottom";
import { InnerGridTop } from "../grid/top";
import { InnerLayout } from "../Layout";

export const Artist = () => {
  const params = useParams<ArtistParams>();
  const { data, isLoading, error } = useGetArtist(params);
  console.log(data);

  if (!data || isLoading) return <h2>loading...</h2>;
  if (error) return <p>something gone wrong</p>;
  return (
    <InnerLayout>
      <InnerGridTop data={data.data} isLoading={isLoading} />
      <ArtistGridBottom
      // data={data} isLoading={isLoading}
      />
    </InnerLayout>
  );
};

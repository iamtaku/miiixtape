import React from "react";
import { useParams } from "react-router";
import { useGetArtist } from "../../queries/hooks";
import { ArtistParams } from "../../queries/api";
import { ArtistGridBottom } from "./ArtistGridBottom";
import { InnerGridTop } from "../grid/top";
import { InnerLayout } from "../Layout";

export const Artist = () => {
  const params = useParams<ArtistParams>();
  const { data, isLoading } = useGetArtist(params);
  console.log(data);

  // return <>{JSON.stringify(data)}</>;
  if (!data || isLoading) return <h2>loading...</h2>;
  return (
    <InnerLayout>
      <InnerGridTop data={data.data} isLoading={isLoading} />
      <ArtistGridBottom
      // data={data} isLoading={isLoading}
      />
    </InnerLayout>
  );
};

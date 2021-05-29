import React from "react";
import { useHistory } from "react-router";
import { GetSinglePlaylist } from "../queries/hooks/GetSinglePlaylist";
import { InnerGridBottom } from "./grid/bottom/InnerGridBottom";
import { Layout } from "./Layout";
import { InnerGridTop } from "./grid/top/InnerGridTop";
import { InnerLayout } from "./grid/InnerLayout";

export const Playlist = () => {
  const { data, isLoading, error } = GetSinglePlaylist();
  const history = useHistory();
  if (error) {
    console.log(error);
    history.push("/app/error");
  }

  return (
    <Layout>
      <InnerLayout>
        <InnerGridTop data={data} isLoading={isLoading} />
        <InnerGridBottom data={data} isLoading={isLoading} />
      </InnerLayout>
    </Layout>
  );
};

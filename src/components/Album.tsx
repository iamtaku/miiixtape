import React from "react";
import { Layout } from "./Layout";
import { InnerLayout } from "./grid/InnerLayout";
import { useHistory } from "react-router";
import { InnerGridTop } from "./grid/top/InnerGridTop";
import { InnerGridBottom } from "./grid/bottom/InnerGridBottom";
import { GetAlbum } from "../queries/hooks/GetAlbum";

export const Album = () => {
  const { data, isLoading, error } = GetAlbum();
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

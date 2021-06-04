import React from "react";
import { Layout } from "./Layout";
import { InnerLayout } from "./grid/InnerLayout";
import { useHistory } from "react-router";
import { InnerGridTop } from "./grid/top/InnerGridTop";
import { InnerGridBottom } from "./grid/bottom/InnerGridBottom";
import { GetAlbum } from "../queries/hooks/GetAlbum";
import { useQueryClient } from "react-query";

export const Album = ({ id }: { id?: string }) => {
  const { data, isLoading, error } = GetAlbum();
  const history = useHistory();
  const queryClient = useQueryClient();
  const test = queryClient.getQueryData([
    "album",
    { albumId: data?.playlistInfo.id, service: "spotify" },
  ]);
  console.log(test);

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

import React from "react";
import { useHistory } from "react-router";
import { useGetSinglePlaylist } from "../../queries/hooks";
import { InnerGridBottom } from "../grid/bottom";
import { useQueryClient } from "react-query";

export const Playlist: React.FC = () => {
  const { data, isLoading, error, isError } = useGetSinglePlaylist();
  const queryClient = useQueryClient();
  const history = useHistory();

  // if (!isAuthenticated()) {
  // return <PlaylistShare />;
  // }

  if (isError) {
    console.log(error);
    queryClient.invalidateQueries(["user"]);
    // debugger;
    history.push("/app/error");
  }

  return (
    <InnerGridBottom data={data} isLoading={isLoading} isError={isError} />
  );
};

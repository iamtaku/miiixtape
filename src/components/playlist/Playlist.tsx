import React from "react";
import { useHistory, useParams } from "react-router-dom";
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
    // debugger;
    return <p>error</p>;
  }

  return (
    <>
      <InnerGridBottom data={data} isLoading={isLoading} isError={isError} />
    </>
  );
};

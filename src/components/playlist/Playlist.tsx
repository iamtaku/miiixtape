import React from "react";
import { useHistory, useParams } from "react-router";
import { useGetSinglePlaylist } from "../../queries/hooks";
import { InnerGridBottom } from "../grid/bottom";
import { PlaylistShare } from "./PlaylistShare";
import { isAuthenticated } from "../../helpers/utils";

export const Playlist: React.FC = () => {
  const { data, isLoading, error, isError } = useGetSinglePlaylist();
  const history = useHistory();

  // if (!isAuthenticated()) {
  // return <PlaylistShare />;
  // }

  if (isError) {
    debugger;
    console.log(error);
    // history.push("/app/error");
  }

  return (
    <InnerGridBottom data={data} isLoading={isLoading} isError={isError} />
  );
};

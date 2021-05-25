import { useHistory } from "react-router";
import { GetSinglePlaylist } from "../../queries/hooks/GetSinglePlaylist";
import { InnerGridBottom } from "./InnerGridBottom";
import { InnerGridLayout } from "./InnerGridLayout";
import { InnerGridTop } from "./InnerGridTop";

export const Playlist = () => {
  const { data, error } = GetSinglePlaylist();
  const history = useHistory();
  if (error) {
    history.push("/app/error");
  }

  return (
    <InnerGridLayout>
      <InnerGridTop data={data?.playlistInfo} tracks={data?.tracks} />
      <InnerGridBottom data={data?.tracks} />
    </InnerGridLayout>
  );
};

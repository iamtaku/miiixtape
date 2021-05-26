import { useHistory } from "react-router";
import { GetSinglePlaylist } from "../../queries/hooks/GetSinglePlaylist";
import { InnerGridBottom } from "./bottom/InnerGridBottom";
import { InnerGridLayout } from "./GridLayout";
import { InnerGridTop } from "./top/InnerGridTop";

export const Playlist = () => {
  const { data, isLoading, error } = GetSinglePlaylist();
  const history = useHistory();
  if (error) {
    history.push("/app/error");
  }

  return (
    <InnerGridLayout>
      <InnerGridTop data={data} isLoading={isLoading} />
      <InnerGridBottom data={data} isLoading={isLoading} />
    </InnerGridLayout>
  );
};

import { useMutation, useQueryClient } from "react-query";
import { Tracks } from "../../types/types";
import { PlaylistItems } from "../api";

const postPlaylistItems = async ({
  id,
  tracks,
}: {
  id: string;
  tracks: Tracks;
}) => {
  const body = {
    playlist_items: {
      songs: tracks,
    },
  };

  return await PlaylistItems.createPlaylistItems(id, body);
};
export const PostPlaylistItems = () => {
  const queryClient = useQueryClient();
  return useMutation(postPlaylistItems, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("playlist");
      console.log("tracks have been added! ", data);
    },
    onError: (error) => {
      console.error("Error : ", error);
    },
  });
};

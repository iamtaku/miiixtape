import { useMutation, useQueryClient } from "react-query";
import { Playlist as api } from "../api";
const postPlaylist = async (name: string) => {
  const payload = {
    playlist: {
      name,
    },
  };

  try {
    return await api.createPlaylist(payload);
  } catch (err) {
    throw new Error(err);
  }
};

export const usePostPlaylist = () => {
  const queryClient = useQueryClient();
  return useMutation(postPlaylist, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("playlistAll"); //change so we don't refetch data
      console.log("playlist created! : ", data);
    },
  });
};

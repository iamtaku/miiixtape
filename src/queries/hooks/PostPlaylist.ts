import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { Playlist } from "../../types/types";
const postPlaylist = async (name: string) => {
  const token = window.localStorage.getItem("token");
  if (!token) throw Error("no token");

  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const body = {
    playlist: {
      name,
    },
  };

  const url = `${process.env.REACT_APP_BASE_URL}/playlists`;
  return await axios.post<Playlist>(url, body, headers);
};

export const PostPlaylist = () => {
  const queryClient = useQueryClient();
  return useMutation(postPlaylist, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("playlistAll"); //change so we don't refetch data
      console.log("playlist created! : ", data);
    },
  });
};

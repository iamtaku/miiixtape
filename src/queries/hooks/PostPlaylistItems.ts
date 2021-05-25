import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { Playlist, Tracks } from "../../types/types";

const postPlaylistItems = async ({
  id,
  tracks,
}: {
  id: string;
  tracks: Tracks;
}) => {
  const token = window.localStorage.getItem("token");
  if (!token) throw Error("no token");
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const body = {
    playlist_items: {
      songs: tracks,
    },
  };

  const url = `${process.env.REACT_APP_BASE_URL}/playlists/${id}/playlist_items`;
  return await axios.post<Playlist>(url, body, headers);
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

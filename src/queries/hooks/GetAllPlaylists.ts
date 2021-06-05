import { useQuery } from "react-query";
import { Playlist as PlaylistType } from "../../types/types";
import { Playlist } from "../api";

const getAllPlaylists = async (): Promise<PlaylistType[]> => {
  try {
    return await Playlist.getPlaylists();
  } catch (error) {
    throw new Error(error);
  }
};

export const GetAllPlaylists = () =>
  useQuery<PlaylistType[], Error>("playlistAll", getAllPlaylists, {
    staleTime: Infinity,
  });

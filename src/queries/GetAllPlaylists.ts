import { Playlists, ServerPlaylist } from "./types";
import { useQuery } from "react-query";
import axios from "axios";

const getPlaylist = async (): Promise<ServerPlaylist[]> => {
  const token = window.localStorage.getItem("token");
  if (token) {
    // return await axios.get();

    const url = `${process.env.REACT_APP_BASE_URL}/playlists`;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const data = await axios.get<Playlists>(url, {
        headers,
      });
      //   return data.data.;
      if (data.status === 200) {
        return data.data.data;
      }
    } catch (error) {
      return error.message;
    }
  }
  throw new Error("No token");
};

export const GetPlaylists = () =>
  useQuery<ServerPlaylist[], Error>("plaaaylistAll", getPlaylist, {
    staleTime: Infinity,
  });

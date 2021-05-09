import { ServerPlaylists } from "./types";
import { useQuery } from "react-query";
import axios, { AxiosResponse } from "axios";
import { mapToPlaylist } from "../helpers/helpers";
import { Playlist } from "../types/types";
import { Server } from "node:http";

const mapServerPlaylist = (
  data: AxiosResponse<ServerPlaylists>
): Playlist[] => {
  const mappedData: Playlist[] = data.data.data.map((item) => {
    return {
      playlistInfo: {
        id: item.id,
        name: item.attributes.name,
      },
    };
  });
  return mappedData;
};

const getPlaylist = async (): Promise<Playlist[]> => {
  const token = window.localStorage.getItem("token");
  if (token) {
    // return await axios.get();

    const url = `${process.env.REACT_APP_BASE_URL}/playlists`;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const data = await axios.get<ServerPlaylists>(url, {
        headers,
      });
      //   return data.data.;
      if (data.status === 200) {
        const mappedData = mapServerPlaylist(data);
        return mappedData;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  throw new Error("No token");
};

export const GetAllPlaylists = () =>
  useQuery<Playlist[], Error>("plaaaylistAll", getPlaylist, {
    staleTime: Infinity,
  });

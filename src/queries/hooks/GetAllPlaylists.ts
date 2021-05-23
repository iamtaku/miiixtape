import { ServerPlaylists } from "../types";
import { useQuery } from "react-query";
import axios, { AxiosResponse } from "axios";
import { mapToPlaylist } from "../../helpers/helpers";
import { Playlist } from "../../types/types";

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

const getAllPlaylists = async (): Promise<Playlist[]> => {
  const token = window.localStorage.getItem("token");
  if (token) {
    const url = `${process.env.REACT_APP_BASE_URL}/playlists`;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const data = await axios.get<ServerPlaylists>(url, {
        headers,
      });
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
  useQuery<Playlist[], Error>("playlistAll", getAllPlaylists, {
    staleTime: Infinity,
  });

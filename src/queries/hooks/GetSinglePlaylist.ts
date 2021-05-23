import { useQuery } from "react-query";
import axios from "axios";
import { ServerPlaylist, UserAttributes } from "../types";
import { Service, Playlist } from "../../types/types";
import { getSingleSpotifyPlaylist } from "../GetSingleSpotifyPlaylist";
import { GetUser } from "./GetUser";
import { mapToPlaylist } from "../../helpers/helpers";
import { useParams } from "react-router";

const getPlaaaylist = async (
  playlistId: string,
  token: string
): Promise<Playlist> => {
  const url = `${process.env.REACT_APP_BASE_URL}/playlists/${playlistId}`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const data = await axios.get<ServerPlaylist>(url, {
      headers,
    });
    if (data.status === 200) {
      return mapToPlaylist(data.data);
    }
  } catch (error) {
    throw new Error(error.message);
  }
  throw new Error();
};

const getPlaylist = async (
  playlistId: string,
  service: Service,
  userInfo?: UserAttributes
): Promise<Playlist> => {
  //if we have a token, call corresponding function to fetch and return data
  const token = window.localStorage.getItem("token");
  if (token) {
    switch (service) {
      case "plaaaylist":
        return await getPlaaaylist(playlistId, token);
      case "spotify":
        return await getSingleSpotifyPlaylist(
          playlistId,
          userInfo?.access_token
        );
      default:
        break;
    }
  }
  throw new Error("No token");
};
interface PlaylistParam {
  playlistId: string;
  service: Service;
}

export const GetSinglePlaylist = () => {
  const params = useParams<PlaylistParam>();
  const { data: userInfo } = GetUser();

  return useQuery<Playlist, Error>(
    [`playlist-${params.service}-${params.playlistId}`, params.playlistId],
    () => getPlaylist(params.playlistId, params.service, userInfo),
    {
      enabled: !!userInfo && !!params.playlistId,
      staleTime: Infinity,
    }
  );
};

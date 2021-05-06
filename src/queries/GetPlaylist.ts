import { useQuery, UseQueryResult } from "react-query";
import axios from "axios";
import { ServerPlaylist, Service, UserAttributes, Playlist } from "./types";
import { getSpotifyPlaylist } from "./GetSpotifyPlaylist";

const getPlaaaylist = async (
  url: string,
  headers: any
): Promise<ServerPlaylist> => {
  try {
    const data = await axios.get<ServerPlaylist>(url, {
      headers,
    });
    //   return data.data.;
    if (data.status === 200) {
      return data.data;
    }
  } catch (error) {
    return error.message;
  }
  throw new Error();
};

const getPlaylist = async (
  playlistId: string,
  service: Service,
  userInfo?: UserAttributes
): Promise<ServerPlaylist> => {
  //if we have a token, call corresponding function to fetch and return data
  const token = window.localStorage.getItem("token");
  if (token) {
    const url = `${process.env.REACT_APP_BASE_URL}/playlists/${playlistId}`;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    // let data;
    // switch (service) {
    //   case "spotify":
    //     data = await getSpotifyPlaylist(playlistId, userInfo?.access_token);
    //     console.log(data);
    //     break;
    //   case "plaaaylist":
    //     data = (await getPlaaaylist(url, headers)) as unknown;
    //     break;
    //   default:
    //     throw new Error();
    // }
    // return data as Playlist;
    return await getPlaaaylist(url, headers);
  }
  throw new Error("No token");
};

//fetch correct resource based on parameters
//return a Data proptype for the inner grids
export const GetPlaylist = (
  playlistId: string,
  service: Service,
  userInfo?: UserAttributes
) =>
  useQuery<ServerPlaylist, Error>(
    `playlist-${service}-${playlistId}`,
    () => getPlaylist(playlistId, service, userInfo),
    {
      enabled: !!userInfo && !!playlistId,
      staleTime: Infinity,
    }
  );

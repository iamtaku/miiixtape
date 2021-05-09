import { useQuery } from "react-query";
import axios, { AxiosResponse } from "axios";
import { ServerPlaylist, ServerSong, UserAttributes } from "./types";
import { Service, Playlist, Song, PlaylistInfo } from "../types/types";
import { getSingleSpotifyPlaylist } from "./GetSingleSpotifyPlaylist";
import { useParams } from "react-router";
import { GetUser } from "./GetUser";
import { mapToPlaylist } from "../helpers/helpers";

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
      console.log(data.data);
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
    // let data;
    // console.log(service);
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
    // return data;

    //we want to return the common playlist structure
    //check service to see if it is spotify/etc
    //fetch appropriate resource
    //convert data returned
    // return mapToPlaylist(data);
  }
  throw new Error("No token");
};

//fetch correct resource based on parameters
//return a Data proptype for the inner grids
interface PlaylistParam {
  playlistId: string;
  service: Service;
}
export const GetSinglePlaylist = () => {
  const { playlistId, service } = useParams<PlaylistParam>();
  const { data: userInfo } = GetUser();

  return useQuery<Playlist, Error>(
    `playlist-${service}-${playlistId}`,
    () => getPlaylist(playlistId, service, userInfo),
    {
      enabled: !!userInfo && !!playlistId,
      staleTime: Infinity,
    }
  );
};

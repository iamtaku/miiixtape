import { useQuery } from "react-query";
import { ServerPlaylist, UserAttributes } from "../types";
import { Service, Playlist, PlaylistParam } from "../../types/types";
import { getSingleSpotifyPlaylist } from "../getSpotifySinglePlaylist";
import { GetUser } from "./GetUser";
import { useParams } from "react-router";
import SpotifyWebApi from "spotify-web-api-js";
import { getPlaaaylist } from "../getPlaaaylist";

const getPlaylist = async (
  playlistId: string,
  service: Service,
  userInfo?: UserAttributes
): Promise<Playlist> => {
  const token = window.localStorage.getItem("token");
  if (!token || !userInfo) {
    throw new Error("auth error");
  }
  const client = new SpotifyWebApi();
  client.setAccessToken(userInfo?.access_token);

  switch (service) {
    case "plaaaylist":
      return await getPlaaaylist(playlistId, token, client);
    case "spotify":
      return await getSingleSpotifyPlaylist(playlistId, client);
    default:
      throw new Error("something gone wrong");
  }
};

export const GetSinglePlaylist = () => {
  const params = useParams<PlaylistParam>();
  const { data: userInfo } = GetUser();

  return useQuery<Playlist, Error>(
    ["playlist", params.playlistId],
    () => getPlaylist(params.playlistId, params.service, userInfo),
    {
      enabled: !!userInfo && !!params.playlistId,
      staleTime: 360000,
    }
  );
};

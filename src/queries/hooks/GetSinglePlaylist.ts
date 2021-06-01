import { useQuery } from "react-query";
import { UserAttributes } from "../types";
import { Playlist, PlaylistParam } from "../../types/types";
import { getSingleSpotifyPlaylist } from "../getSpotifySinglePlaylist";
import { GetUser } from "./GetUser";
import { useParams } from "react-router";
import SpotifyWebApi from "spotify-web-api-js";
import { getPlaaaylist } from "../getPlaaaylist";

const getPlaylist = async (
  params: PlaylistParam,
  userInfo?: UserAttributes
): Promise<Playlist> => {
  const token = window.localStorage.getItem("token");
  if (!token || !userInfo) {
    throw new Error("auth error");
  }
  const client = new SpotifyWebApi();
  client.setAccessToken(userInfo?.access_token);

  switch (params.service) {
    case "plaaaylist":
      return await getPlaaaylist(params.playlistId, token, client);
    case "spotify":
      return await getSingleSpotifyPlaylist(params.playlistId, client);
    default:
      throw new Error("something gone wrong");
  }
};

export const GetSinglePlaylist = () => {
  const params = useParams<PlaylistParam>();
  const { data: userInfo } = GetUser();

  return useQuery<Playlist, Error>(
    ["playlist", { ...params }],
    () => getPlaylist(params, userInfo),
    {
      enabled: !!userInfo,
      // staleTime: 360000,
    }
  );
};

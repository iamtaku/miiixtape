import { useQuery } from "react-query";
import { useParams } from "react-router";
import SpotifyWebApi from "spotify-web-api-js";
import { Playlist, Service } from "../../types/types";
import { UserAttributes } from "../types";
import { GetUser } from "./GetUser";
import { getSpotifyAlbum } from "../getSpotifyAlbum";
const getAlbum = async (
  params: AlbumParam,
  userInfo?: UserAttributes
): Promise<Playlist> => {
  const token = window.localStorage.getItem("token");
  if (!token || !userInfo) {
    throw new Error("auth error");
  }
  const client = new SpotifyWebApi();
  client.setAccessToken(userInfo?.access_token);

  switch (params.service) {
    case "spotify":
      return await getSpotifyAlbum(params.albumId, client);
    default:
      throw new Error("something gone wrong");
  }
};

interface AlbumParam {
  service: Service;
  albumId: string;
}

export const GetAlbum = () => {
  const params = useParams<AlbumParam>();
  const { data: userInfo } = GetUser();

  return useQuery<Playlist, Error>(
    ["playlist", params.albumId],
    () => getAlbum(params, userInfo),
    {
      enabled: !!userInfo && !!params.albumId,
      staleTime: 360000,
    }
  );
};

import SpotifyWebApi from "spotify-web-api-js";
import {
  Artist,
  Collection as PlaylistType,
  Tracks,
} from "../../../types/types";
import api, { Playlist, Spotify, SoundCloud } from "../";
import { UserAttributes } from "../../types";

export interface ArtistParams {
  artistId: string;
  service: string;
}
export const getArtist = async (
  params: ArtistParams,
  userInfo?: UserAttributes
): Promise<Artist> => {
  const client = new SpotifyWebApi();
  userInfo && client.setAccessToken(userInfo.access_token);

  try {
    switch (params.service) {
      case "spotify":
        return await Spotify.getArtist(params.artistId, client);
      case "soundcloud":
        return await SoundCloud.getArtist(params.artistId);
      default:
        throw new Error("something gone wrong");
    }
  } catch {
    throw new Error("something gone wrong");
  }
};

interface IParam {
  id: string;
  service: string;
}
export const getPlaylist = async (
  params: IParam,
  userInfo?: UserAttributes
): Promise<PlaylistType> => {
  if (!userInfo) {
    throw new Error("auth error");
  }
  const client = new SpotifyWebApi();
  client.setAccessToken(userInfo?.access_token);

  switch (params.service) {
    case "plaaaylist":
      return await Playlist.getPlaylist(params.id, client);
    case "spotify":
      return await Spotify.getPlaylist(params.id, client);
    default:
      throw new Error("something gone wrong");
  }
};

export const getUser = async (): Promise<UserAttributes> => {
  return await Playlist.getUser();
};

export const postPlaylistItems = async ({
  id,
  tracks,
}: {
  id: string;
  tracks: Tracks;
}) => {
  const body = {
    playlist_items: {
      songs: tracks,
    },
  };

  return await Playlist.createPlaylistItems(id, body);
};

export const postPlaylist = async (name: string) => {
  const payload = {
    playlist: {
      name,
    },
  };
  return await Playlist.createPlaylist(payload);
};

export const deletePlaylist = async (id: string) => {
  return await Playlist.deletePlaylist(id);
};

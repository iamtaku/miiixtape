import { useMutation, useQuery, useQueryClient } from "react-query";
import { UserAttributes } from "./types";
import { Artist, Collection as CollectionType } from "../types/types";
import { useParams } from "react-router";
import {
  ArtistParams,
  getAllPlaylists,
  getArtist,
  getPlaylist,
  getToken,
  getUser,
  postPlaylist,
  postPlaylistItems,
  Token,
  AlbumParam,
  getAlbum,
  getSpotifyInfo,
  getSpotifyPlaylists,
} from "./api/";

export const useGetArtist = (params: ArtistParams) => {
  const { data: userInfo } = useGetUser();
  return useQuery<Artist, Error>(["artist", params], () =>
    getArtist(params, userInfo)
  );
};

export const useGetSinglePlaylist = (id: string, service: string) => {
  const { data: userInfo } = useGetUser();
  return useQuery<CollectionType, Error>(
    ["collection", { id, service }],
    () => getPlaylist({ id, service }, userInfo),
    {
      enabled: !!userInfo,
      staleTime: Infinity,
    }
  );
};

export const useGetToken = () => useQuery<Token>("token", getToken);

export const useGetUser = () => {
  const { data: token } = useGetToken();
  return useQuery<UserAttributes>("user", getUser, {
    enabled: !!token,
    refetchInterval: 1000 * 60 * 59,
  });
};

export const useGetAlbum = () => {
  const params = useParams<AlbumParam>();
  const { data: userInfo } = useGetUser();

  return useQuery<CollectionType, Error>(
    ["collection", { id: params.albumId, service: params.service }],
    () => getAlbum(params, userInfo),
    {
      enabled: !!userInfo && !!params.albumId,
    }
  );
};

export const useGetAllSpotifyPlaylist = () => {
  const { data: userInfo } = useGetUser();
  return useQuery("spotifyPlaylistAll", () => getSpotifyPlaylists(userInfo), {
    enabled: !!userInfo,
    staleTime: Infinity,
  });
};

export const useGetSpotifyUser = () => {
  const { data: userInfo } = useGetUser();
  return useQuery("spotifyInfo", () => getSpotifyInfo(userInfo), {
    enabled: !!userInfo,
  });
};

export const useGetAllPlaylists = () =>
  useQuery<CollectionType[], Error>("playlistAll", getAllPlaylists, {});

export const usePostPlaylistItems = () => {
  const queryClient = useQueryClient();
  return useMutation(postPlaylistItems, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("collection");
      console.log("tracks have been added! ", data);
    },
    onError: (error) => {
      console.error("Error : ", error);
    },
  });
};

export const usePostPlaylist = () => {
  const queryClient = useQueryClient();
  return useMutation(postPlaylist, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("playlistAll"); //change so we don't refetch data
      console.log("collection created! : ", data);
    },
  });
};

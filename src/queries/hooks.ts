import { useMutation, useQuery, useQueryClient } from "react-query";
import { UserAttributes } from "./types";
import {
  Artist,
  Collection as CollectionType,
  PlaylistParam,
} from "../types/types";
import { useParams } from "react-router";
import {
  ArtistParams,
  getArtist,
  getPlaylist,
  getUser,
  postPlaylist,
  postPlaylistItems,
  AlbumParam,
  getAlbum,
  getSpotifyInfo,
  getSpotifyPlaylists,
  Playlist,
  deletePlaylist,
} from "./api/";
import { AxiosError } from "axios";
import { useGlobalContext } from "../state/context";
// import { useGlobalContext } from "../state/context";

export const useGetArtist = (params: ArtistParams) => {
  const { data: userInfo } = useGetUser();
  return useQuery<Artist, Error>(
    ["artist", params],
    () => getArtist(params, userInfo),
    {
      enabled: !!userInfo,
    }
  );
};

export const useGetSinglePlaylist = () => {
  const params = useParams<PlaylistParam>();
  const { data: userInfo } = useGetUser();
  return useQuery<CollectionType, AxiosError>(
    ["collection", { id: params.playlistId, service: params.service }],
    () =>
      getPlaylist({ id: params.playlistId, service: params.service }, userInfo),
    {
      enabled: !!userInfo,
      staleTime: Infinity,
      refetchInterval: false,
    }
  );
};

export const useGetUser = () => {
  return useQuery<UserAttributes>("user", getUser);
};

export const useGetAlbum = () => {
  const params = useParams<AlbumParam>();
  const { data: userInfo } = useGetUser();

  return useQuery<CollectionType, AxiosError>(
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
  });
};

export const useGetSpotifyUser = () => {
  const { data: userInfo } = useGetUser();
  return useQuery("spotifyInfo", () => getSpotifyInfo(userInfo), {
    enabled: !!userInfo,
    retry: true,
  });
};

export const useGetAllPlaylists = () =>
  useQuery<CollectionType[], AxiosError>("playlistAll", Playlist.getPlaylists);

export const usePostPlaylistItems = () => {
  const queryClient = useQueryClient();
  const params = useParams<PlaylistParam>();
  // const { dispatch } = useGlobalContext();
  return useMutation(postPlaylistItems, {
    onSuccess: (data) => {
      // change below so we don't refetch data!!
      queryClient.invalidateQueries([
        "collection",
        { id: params.playlistId, service: params.service },
      ]);
      console.log(data);
      // dispatch({ type: "ADD_TO_QUEUE", payload: data });
    },
    onError: (error) => {
      console.error("no joy for postplaylistitems");
      throw new Error(`Error: ${error}`);
    },
  });
};

export const usePostPlaylist = () => {
  const queryClient = useQueryClient();
  return useMutation(postPlaylist, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("playlistAll"); //change so we don't refetch data
    },
  });
};

export const useDeletePlaylist = () => {
  const params = useParams<PlaylistParam>();
  const queryClient = useQueryClient();
  return useMutation(() => deletePlaylist(params.playlistId), {
    onSuccess: (data, error, editedValue) => {
      queryClient.removeQueries([
        "collection",
        { id: params.playlistId, service: params.service },
      ]);
      queryClient.invalidateQueries("playlistAll");
    },
    onError: (error) => {
      console.error("no joy for deletePlaylistIt");
      throw new Error(`Error: ${error}`);
    },
  });
};

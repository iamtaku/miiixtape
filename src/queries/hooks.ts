import { useMutation, useQuery, useQueryClient } from "react-query";
import { BaseParams, UserAttributes } from "./types";
import {
  Artist,
  Collection as CollectionType,
  PlaylistParam,
  Song,
} from "../types/types";
import { useParams } from "react-router-dom";
import {
  ArtistParams,
  getArtist,
  getPlaylist,
  getUser,
  postPlaylist,
  postPlaylistItems,
  getAlbum,
  getSpotifyInfo,
  getSpotifyPlaylists,
  Playlist,
  deletePlaylist,
  deletePlaylistItem,
} from "./api/";
import { AxiosError } from "axios";
import { generatePlaylistTracks as getTrackInfo } from "./api/miiixtape/generatePlaylistData";

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
    ["collection", params.id],
    () => getPlaylist({ id: params.id, service: params.service }, userInfo),
    {
      enabled: !!userInfo,
      refetchInterval: false,
      retry: 3,
    }
  );
};

export const useGetUser = () => {
  return useQuery<UserAttributes>("user", getUser);
};

export const useGetAlbum = () => {
  const params = useParams<BaseParams>();
  const { data: userInfo } = useGetUser();

  return useQuery<CollectionType, AxiosError>(
    ["collection", { id: params.id, service: params.service }],
    () => getAlbum(params, userInfo),
    {
      enabled: !!userInfo && !!params.id,
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
  });
};

export const useGetTrack = (song: Song, collectionId: string) => {
  const { data: userInfo } = useGetUser();
  const queryClient = useQueryClient();
  return useQuery<Song, AxiosError>(
    ["song", song.id],
    () => getTrackInfo(song, userInfo?.access_token),
    {
      enabled: !!userInfo,
      cacheTime: Infinity,
      initialData: () =>
        queryClient
          .getQueryData<CollectionType>(["collection", collectionId])
          ?.tracks.find((track) => track.id === song.id),
    }
  );
};

export const useGetAllPlaylists = () =>
  useQuery<CollectionType[], AxiosError>("playlistAll", Playlist.getPlaylists);

export const usePostPlaylistItems = () => {
  const queryClient = useQueryClient();
  return useMutation(postPlaylistItems, {
    onMutate: ({ id, tracks }) => console.log(id, tracks),
    onSuccess: (data, { id, tracks }) => {
      // change below so we don't refetch data!!
      // queryClient.setQueryData('todos', old => old.map(todo => todo.id === context.optimisticTodo.id ? result : todo))
      queryClient.invalidateQueries(["collection", id]);
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
  return useMutation(() => deletePlaylist(params.id), {
    onSuccess: (data, error, editedValue) => {
      queryClient.removeQueries([
        "collection",
        { id: params.id, service: params.service },
      ]);
      queryClient.invalidateQueries("playlistAll");
    },
    onError: (error) => {
      console.error("no joy for deletePlaylistIt");
      throw new Error(`Error: ${error}`);
    },
  });
};

export const useDeletePlaylistItem = () => {
  const params = useParams<PlaylistParam>();
  const queryClient = useQueryClient();
  return useMutation(deletePlaylistItem, {
    onSuccess: () => {
      queryClient.invalidateQueries(["collection", params.id]);
      console.log(params.id);
    },
  });
};

export const useFetchSongCache = (id?: string) => {
  const queryClient = useQueryClient();
  if (!!!id) return undefined;
  const songCache = queryClient.getQueryData<Song>(["song", id]);
  return songCache;
};

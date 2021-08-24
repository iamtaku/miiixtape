import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "react-query";
import { BaseParams, UserAttributes } from "./types";
import {
  Artist,
  Collection as CollectionType,
  PlaylistParam,
  Song,
  Tracks,
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
  deletePlaylist,
  deletePlaylistItem,
  patchPlaylistItem,
  patchPlaylist,
  getAllPlaylists,
} from "./api/";
import { AxiosError } from "axios";
import { generatePlaylistTracks } from "./api/miiixtape/generatePlaylistData";

export const useGetArtist = (
  params: ArtistParams
): UseQueryResult<Artist, Error> => {
  const { data: userInfo } = useGetUser();
  return useQuery<Artist, Error>(
    ["artist", params],
    () => getArtist(params, userInfo),
    {
      enabled: !!userInfo,
    }
  );
};

export const useGetUser = (): UseQueryResult<UserAttributes, AxiosError> => {
  return useQuery<UserAttributes, AxiosError>("user", getUser);
};

export const useGetAlbum = (): UseQueryResult<CollectionType, AxiosError> => {
  const params = useParams<BaseParams>();
  const { data: userInfo } = useGetUser();

  return useQuery<CollectionType, AxiosError>(
    ["collection", params.id],
    () => getAlbum(params, userInfo),
    {
      enabled: !!userInfo && !!params.id,
    }
  );
};

export const useGetAllSpotifyPlaylist = (): UseQueryResult<
  CollectionType[],
  Error
> => {
  const { data: userInfo } = useGetUser();
  return useQuery("spotifyPlaylistAll", () => getSpotifyPlaylists(userInfo), {
    enabled: !!userInfo,
  });
};

export const useGetSpotifyUser = (): UseQueryResult<
  SpotifyApi.UserProfileResponse,
  Error
> => {
  const { data: userInfo } = useGetUser();
  return useQuery("spotifyInfo", () => getSpotifyInfo(userInfo), {
    enabled: !!userInfo,
  });
};

export const useGetTrack = (
  song: Song
  // collectionId: string
): UseQueryResult<Song, AxiosError> => {
  const { data: userInfo } = useGetUser();
  return useQuery<Song, AxiosError>(
    ["song", song.uri],
    () => generatePlaylistTracks(song, userInfo?.access_token),
    {
      enabled: !!userInfo,
      cacheTime: Infinity,
      // initialData: () =>
      // queryClient
      // .getQueryData<CollectionType>(["collection", collectionId])
      // ?.tracks.find((track) => track.uri === song.uri),
    }
  );
};

export const useGetAllPlaylists = (): UseQueryResult<
  CollectionType[],
  AxiosError
> => {
  return useQuery<CollectionType[], AxiosError>(
    "playlistAll",
    getAllPlaylists
    // {
    //   onSuccess: (data) => {
    //     data.forEach((collection) => {
    //       queryClient.setQueryData<Collection>(
    //         ["collection", collection.playlistInfo.id],
    //         collection
    //       );
    //     });
    //   },
    // }
  );
};

export const usePostPlaylistItems = (): UseMutationResult<
  CollectionType,
  unknown,
  {
    id: string;
    tracks: Tracks;
  },
  void
> => {
  const queryClient = useQueryClient();
  return useMutation(postPlaylistItems, {
    onSuccess: (data, { id }) => {
      queryClient.setQueryData(["collection", id], data);
    },
    onError: (error) => {
      console.error("no joy for postplaylistitems");
      throw new Error(`Error: ${error}`);
    },
  });
};

export const usePatchPlaylistItems = (): UseMutationResult<
  CollectionType,
  unknown,
  {
    id: string;
    position: number;
    updatedTracks?: Tracks;
  },
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation(patchPlaylistItem, {
    onSuccess: (data, { id, updatedTracks }) => {
      queryClient.setQueryData(["collection", id], () => ({
        ...data,
        tracks: updatedTracks,
      }));
    },
    onError: (error) => {
      console.error("no joy for postplaylistitems");
      throw new Error(`Error: ${error}`);
    },
  });
};

export const usePostPlaylist = (): UseMutationResult<
  CollectionType,
  unknown,
  string,
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation(postPlaylist, {
    onSuccess: (_data) => {
      queryClient.invalidateQueries("playlistAll"); //change so we don't refetch data
    },
  });
};

export const usePatchPlaylist = (): UseMutationResult<
  CollectionType,
  unknown,
  {
    id: string;
    name?: string | undefined;
    position?: number | undefined;
    isEditable?: boolean | undefined;
  },
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation(patchPlaylist, {
    onSuccess: (data) => {
      queryClient.setQueryData(["collection", data.playlistInfo.id], {
        ...data,
      });
      queryClient.invalidateQueries("playlistAll");
    },
  });
};

export const useDeletePlaylist = (): UseMutationResult<
  void,
  unknown,
  void,
  unknown
> => {
  const params = useParams<PlaylistParam>();
  const queryClient = useQueryClient();
  return useMutation(() => deletePlaylist(params.id), {
    onSuccess: (_data) => {
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

export const useGetSinglePlaylist = (
  id?: string | null
): UseQueryResult<CollectionType, AxiosError> => {
  const params = useParams<PlaylistParam>();
  const { data: userInfo } = useGetUser();
  const queryClient = useQueryClient();
  return useQuery<CollectionType, AxiosError>(
    ["collection", id ? id : params.id],
    () => getPlaylist({ id: params.id, service: params.service }, userInfo),
    {
      enabled: !!userInfo,
      refetchInterval: false,
      retry: 3,
      onSuccess: (data) => {
        data.tracks.forEach((track) =>
          queryClient.setQueryData(["track", track.uri], track)
        );
      },
    }
  );
};

export const useDeletePlaylistItem = (): UseMutationResult<
  void,
  unknown,
  string,
  unknown
> => {
  const params = useParams<PlaylistParam>();
  const queryClient = useQueryClient();
  return useMutation(deletePlaylistItem, {
    onSuccess: () => {
      queryClient.invalidateQueries(["collection", params.id]);
      console.log(params.id);
    },
  });
};

type stringOrNull = string | null;

export const useFetchCache = <T>(
  queryKey: [string, stringOrNull?]
): T | undefined => {
  const queryClient = useQueryClient();
  if (!queryKey) return undefined;
  const cache = queryClient.getQueryData<T>(queryKey);
  return cache;
};

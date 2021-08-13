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
  Playlist,
  deletePlaylist,
  deletePlaylistItem,
  patchPlaylistItem,
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

export const useGetSinglePlaylist = (): UseQueryResult<
  CollectionType,
  AxiosError
> => {
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

export const useGetUser = (): UseQueryResult<UserAttributes, AxiosError> => {
  return useQuery<UserAttributes, AxiosError>("user", getUser);
};

export const useGetAlbum = (): UseQueryResult<CollectionType, AxiosError> => {
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
  song: Song,
  collectionId: string
): UseQueryResult<Song, AxiosError> => {
  const { data: userInfo } = useGetUser();
  const queryClient = useQueryClient();
  return useQuery<Song, AxiosError>(
    ["song", song.uri],
    () => generatePlaylistTracks(song, userInfo?.access_token),
    {
      enabled: !!userInfo,
      cacheTime: Infinity,
      initialData: () =>
        queryClient
          .getQueryData<CollectionType>(["collection", collectionId])
          ?.tracks.find((track) => track.uri === song.uri),
    }
  );
};

export const useGetAllPlaylists = (): UseQueryResult<
  CollectionType[],
  AxiosError
> =>
  useQuery<CollectionType[], AxiosError>("playlistAll", Playlist.getPlaylists);

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
    onMutate: ({ id, tracks }) => console.log(id, tracks),
    onSuccess: (_data, { id }) => {
      // change below so we don't refetch data!!
      queryClient.invalidateQueries(["collection", id]);
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
  },
  unknown
> => {
  // const queryClient = useQueryClient();
  return useMutation(patchPlaylistItem, {
    // onMutate: ({ id, tracks }) => console.log(id, tracks),
    onSuccess: (_data) => {
      // change below so we don't refetch data!!
      // queryClient.invalidateQueries(["collection", id]);
      //
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

export const useFetchSongCache = (id?: string): Song | undefined => {
  const queryClient = useQueryClient();
  if (!id) return undefined;
  const songCache = queryClient.getQueryData<Song>(["song", id]);
  return songCache;
};

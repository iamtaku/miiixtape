import { useMutation, useQuery, useQueryClient } from "react-query";
import { UserAttributes } from "../types";
import { Playlist as PlaylistType, PlaylistParam } from "../../types/types";
import { useParams } from "react-router";
import {
  getAllPlaylists,
  getPlaylist,
  getToken,
  getUser,
  postPlaylist,
  postPlaylistItems,
  Token,
} from "../plaaaylist-queries";
import {
  AlbumParam,
  getAlbum,
  getSpotifyInfo,
  getSpotifyPlaylists,
} from "../spotify-queries";

export const useGetSinglePlaylist = () => {
  const params = useParams<PlaylistParam>();
  const { data: userInfo } = useGetUser();

  return useQuery<PlaylistType, Error>(
    ["playlist", { ...params }],
    () => getPlaylist(params, userInfo),
    {
      enabled: !!userInfo,
      staleTime: 360000,
      refetchOnWindowFocus: false,
    }
  );
};

export const useGetToken = () => useQuery<Token>("token", getToken);

export const useGetUser = () => {
  const { data: token } = useGetToken();
  return useQuery<UserAttributes>("user", () => getUser(token), {
    enabled: !!token,
  });
};

export const useGetAlbum = () => {
  const params = useParams<AlbumParam>();
  const { data: userInfo } = useGetUser();

  return useQuery<PlaylistType, Error>(
    ["album", { ...params }],
    () => getAlbum(params, userInfo),
    {
      enabled: !!userInfo && !!params.albumId,
      staleTime: 360000,
    }
  );
};

export const useGetAllSpotifyPlaylist = () => {
  const { data: userInfo } = useGetUser();
  return useQuery("spotifyPlaylistAll", () => getSpotifyPlaylists(userInfo), {
    enabled: !!userInfo,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};

export const useGetSpotifyUser = () => {
  const { data: userInfo } = useGetUser();

  return useQuery("spotifyInfo", () => getSpotifyInfo(userInfo), {
    enabled: !!userInfo,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};

export const useGetAllPlaylists = () =>
  useQuery<PlaylistType[], Error>("playlistAll", getAllPlaylists, {
    staleTime: Infinity,
  });

export const usePostPlaylistItems = () => {
  const queryClient = useQueryClient();
  return useMutation(postPlaylistItems, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("playlist");
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
      console.log("playlist created! : ", data);
    },
  });
};

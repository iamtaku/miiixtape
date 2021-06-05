import SpotifyWebApi from "spotify-web-api-js";
import {
  PlaylistItemItem,
  ServerPlaylist,
  ServerPlaylists,
} from "../queries/types";
import {
  PlaylistInfo,
  Song,
  Playlist,
  Tracks,
  Album,
  Artists,
} from "../types/types";
import { stripURI } from "./stripURI";

const mapPlaylistItemToTrack = (item: PlaylistItemItem): Song => {
  return {
    id: item.id,
    name: item.attributes.song.name,
    service: item.attributes.song.service,
    uri: item.attributes.song.uri,
    playlistPosition: item.attributes.position,
  };
};

const generateSpotifyHash = async (
  data: PlaylistItemItem[],
  client: SpotifyWebApi.SpotifyWebApiJs
): Promise<IHash> => {
  const spotifyTracks = data.filter(
    (item) => item.attributes.song.service === "spotify"
  );
  //fetch them 50 at a time
  const spotifyURIS = spotifyTracks.map((track) => {
    return stripURI(track.attributes.song.uri);
  });
  const res = await client.getTracks(spotifyURIS);
  const spotifyHash: IHash = {};

  res.tracks.forEach((track) => {
    const mapped = mapSpotifyTracktoTrack(track);
    spotifyHash[mapped.name] = mapped;
  });
  return spotifyHash;
};

interface IHash {
  [title: string]: Song;
}

export const mapToPlaylist = async (
  data: ServerPlaylist,
  client: SpotifyWebApi.SpotifyWebApiJs
): Promise<Playlist> => {
  const playlistInfo: PlaylistInfo = {
    id: data.data.id,
    name: data.data.attributes.name,
    description: data.data.attributes.description,
    type: "playlist",
    service: "plaaaylist",
  };
  if (data.included.length === 0) {
    return {
      playlistInfo,
      tracks: [],
    };
  }

  const spotifyHash = await generateSpotifyHash(data.included, client);
  const tracks = data.included.map((item) => {
    if (item.attributes.song.service === "spotify") {
      const res = spotifyHash[item.attributes.song.name];
      res.playlistPosition = item.attributes.position;
      return res;
    }
    return mapPlaylistItemToTrack(item);
  });

  return {
    playlistInfo,
    tracks,
  };
};
export const mapServerPlaylist = (data: ServerPlaylists): Playlist[] => {
  const mappedData: Playlist[] = data.data.map((item) => {
    return {
      playlistInfo: {
        id: item.id,
        name: item.attributes.name,
        service: "plaaaylist",
      },
    };
  });
  return mappedData;
};
export const mapSpotifyToPlaylist = (
  data: SpotifyApi.ListOfUsersPlaylistsResponse
): Playlist[] => {
  const mappedData: Playlist[] = data.items.map((item) => {
    return {
      playlistInfo: {
        id: item.id,
        name: item.name,
        service: "spotify",
      },
    };
  });
  return mappedData;
};
export const mergeAlbumWithTrack = (
  track: SpotifyApi.TrackObjectSimplified,
  album: SpotifyApi.SingleAlbumResponse
): SpotifyApi.TrackObjectFull => {
  return {
    ...track,
    album,
    external_ids: {},
    popularity: album.popularity,
  };
};

export const mapSpotifyAlbumtoPlaylist = (
  album: SpotifyApi.SingleAlbumResponse
) => {
  const playlistInfo: PlaylistInfo = {
    id: album.id,
    name: album.name,
    external_urls: album.external_urls.spotify,
    img: album.images[0].url,
    service: "spotify",
    type: "album",
  };

  const tracks: Tracks = album.tracks.items.map((item) =>
    mapSpotifyTracktoTrack(mergeAlbumWithTrack(item, album))
  );

  return {
    playlistInfo,
    tracks,
  };
};

export const mapSpotifyTracktoTrack = (
  data: SpotifyApi.SingleTrackResponse | SpotifyApi.TrackObjectFull
): Song => {
  const album: Album = {
    name: data.album.name,
    uri: data.album.uri,
  };

  const artists: Artists = data.artists.map((artist) => ({
    name: artist.name,
    uri: artist.uri,
  }));

  return {
    name: data.name,
    id: data.id,
    service: "spotify",
    uri: data.uri,
    album,
    artists,
    img: data.album.images[0].url,
    time: data.duration_ms,
  };
};

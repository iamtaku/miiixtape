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

  res.tracks.forEach((track, index) => {
    const mapped = mapSpotifyTracktoTrack(track, index);
    spotifyHash[mapped.name] = mapped;
  });
  return spotifyHash;
};

interface IHash {
  [title: string]: Song;
}

// const mapTrackToTrack = async (
//   data: PlaylistItemItem[],
//   client: SpotifyWebApi.SpotifyWebApiJs
// ): Promise<Tracks> => {
//   const tracks = data.map(item => {

//   })
//   return tracks;
// };

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
  //for each track,
  //IF it is a spotify track, we need to fetch info about that track
  //IF youtube, soundcloud etc. fetch appropriate track
  // ELSE just return that track
  // return all mapped tracks for given playlist
  const spotifyHash = await generateSpotifyHash(data.included, client);

  const tracks: Tracks = data.included.map((item) => {
    if (item.attributes.song.service === "spotify") {
      const spotifyTrack = JSON.parse(
        JSON.stringify(spotifyHash[item.attributes.song.name])
      );
      spotifyTrack.playlistPosition = item.attributes.position;
      return spotifyTrack;
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
      tracks: [],
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
      tracks: [],
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

  const tracks: Tracks = album.tracks.items.map((item, index) =>
    mapSpotifyTracktoTrack(mergeAlbumWithTrack(item, album), index)
  );

  return {
    playlistInfo,
    tracks,
  };
};

export const mapSpotifyTracktoTrack = (
  data: SpotifyApi.SingleTrackResponse | SpotifyApi.TrackObjectFull,
  index: number
): Song => {
  const album: Album = {
    name: data.album.name,
    uri: stripURI(data.album.uri),
  };

  const artists: Artists = data.artists.map((artist) => ({
    name: artist.name,
    uri: stripURI(artist.uri),
  }));
  return {
    name: data.name,
    id: `${data.id}-${index}`,
    service: "spotify",
    uri: data.uri,
    album,
    artists,
    img: data.album.images[0].url,
    time: data.duration_ms,
  };
};

export const mapSpotifyPlaylistToPlaylist = (
  data: SpotifyApi.SinglePlaylistResponse
): Playlist => {
  const playlistInfo: PlaylistInfo = {
    id: data.id,
    name: data.name,
    description: data.description ? data.description : "",
    external_urls: data.external_urls.spotify || "",
    img: data.images[0] ? data.images[0].url : "",
    type: "playlist",
    service: "spotify",
  };
  const tracks: Song[] = data.tracks.items.map((item, index) => {
    const newItem = item.track as SpotifyApi.TrackObjectFull;
    return mapSpotifyTracktoTrack(newItem, index);
  });

  return {
    playlistInfo,
    tracks,
  };
};

export const mapTrackToPlaylist = (track: Song): Playlist => ({
  playlistInfo: { name: track.name, id: track.id, service: track.service },
  tracks: [{ ...track }],
});

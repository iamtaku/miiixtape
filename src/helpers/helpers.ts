import { ServerPlaylist, ServerSong } from "../queries/types";
import { PlaylistInfo, Song, Playlist } from "../types/types";
export const mapToPlaylist = (data: ServerPlaylist): Playlist => {
  const playlistInfo: PlaylistInfo = {
    id: data.data.id,
    name: data.data.attributes.name,
    description: data.data.attributes.description,
  };

  const filteredTracks: ServerSong[] = data.included.filter(
    (item): item is ServerSong => item.type === "song"
  );

  const tracks: Song[] = filteredTracks.map((item) => ({
    name: item.attributes.name,
    service: item.attributes.service,
    uri: item.attributes.uri,
    id: item.id,
  }));

  return {
    playlistInfo,
    tracks,
  };
};

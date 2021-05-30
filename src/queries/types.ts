import { Service, Song } from "../types/types";
export interface ServerResponse {
  data: UserData;
}

export interface ServerTokenResponse {
  token: string;
}

export interface UserAttributes {
  username: string;
  spotify_id?: string;
  refresh_token: string;
  access_token: string;
}

interface SingleDataItem {
  id: string;
}

export interface PlaylistItemItem extends SingleDataItem {
  type: "playlist_item";
  attributes: {
    position: number;
    song: SongAttributes;
  };
}

interface UserItem extends SingleDataItem {
  type: "user";
}

interface SongItem extends SingleDataItem {
  type: "song";
}

interface PlaylistItem extends SingleDataItem {
  type: "playlist";
}

interface ServerPlaylistsItem extends PlaylistItem {
  attributes: {
    name: string;
  };
  relationships: {
    user: {
      data: UserItem;
    };
    playlist_items?: {
      data: PlaylistItemItem[];
    };
    songs?: {
      data: SongItem[];
    };
  };
}

export interface ServerPlaylists {
  data: ServerPlaylistsItem[];
}

export type SongAttributes = {
  name: string;
  service: Service;
  uri: string;
};

export interface PlaylistItemRelationship {
  playlist_id: string;
}

export type ServerSong = {
  id: string;
  type: "song";
  attributes: SongAttributes;
  relationships: PlaylistItemRelationship;
};

export type ServerPlaylist = {
  data: {
    attributes: PlaylistAttributes;
    id: string;
    relationships: PlaylistRelationships;
  };
  included: PlaylistItemItem[];
};

export type PlaylistItemPosition = {
  attributes: {
    position: number;
  };
  id: string;
  type: "playlist_item";
};

interface PlaylistRelationships {
  playlist_items: RelationshipDataMultiple;
  songs: RelationshipDataMultiple;
  user: RelationshipData;
}

interface RelationshipDataMultiple {
  data: RelationshipItem[];
}

interface RelationshipData {
  data: RelationshipItem;
}

interface RelationshipItem {
  id: string;
  type: "song" | "user" | "playlist_item";
}

export interface PlaylistAttributes {
  name: string;
  description?: string;
}

export interface SongRelationshipAttribute {
  id: string;
  type: "song";
}
interface UserData {
  id: string;
  attributes: UserAttributes;
  relationships: PlaylistAttributes;
}

export interface PlaylistTracks {
  total: number;
  next?: string;
  previous?: string;
  tracks: Song[];
}

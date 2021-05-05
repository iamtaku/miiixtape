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

export interface Playlists {
  data: Playlist[];
}

export interface Playlist {
  attributes: PlaylistAttributes;
  id: string;
  relationships: PlaylistRelationships;
}

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

// export interface

export interface ResponseDataType<T, F> {
  id: string;
  attributes: T;
  relationships: F[];
}

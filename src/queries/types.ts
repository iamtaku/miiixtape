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
  data: ServerPlaylist[];
}

export interface SongAttributes {
  name: string;
  service: Service;
  uri: string;
}

export interface PlaylistItemRelationship {
  playlist_id: string;
}

export interface ServerSong {
  id: string;
  type: "song";
  attributes: SongAttributes;
  relationships: PlaylistItemRelationship;
}

export interface ServerPlaylist {
  attributes: PlaylistAttributes;
  id: string;
  relationships: PlaylistRelationships;
  included: ServerSong[];
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

export type Service = "plaaaylist" | "spotify";

export interface PlaylistInfo {
  external_urls?: string;
  id: string;
  coverImg?: string;
  name: string;
  description: string;
}

export interface Song {
  name: string;
  service: string;
  uri: string;
  id: string;
  img?: string;
}

export interface PlaylistTracks {
  total: number;
  next?: string;
  previous?: string;
  tracks: Song[];
}

export interface Playlist {
  info: PlaylistInfo;
  tracks: PlaylistTracks;
}

export type Song = {
  name: string;
  service: Service;
  uri: string;
  id: string;
  img?: string;
  playlistPosition?: number;
};

export type Tracks = Song[];

export type Playlist = {
  playlistInfo: PlaylistInfo;
  tracks?: Tracks;
};

export type PlaylistInfo = {
  id: string;
  name: string;
  external_urls?: string;
  img?: string;
  description?: string;
};

export type Service = "plaaaylist" | "spotify" | "youtube" | "";

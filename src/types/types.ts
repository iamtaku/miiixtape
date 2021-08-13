export type Song = {
  name: string;
  service: Service;
  uri: string;
  id: string;
  img?: string;
  playlistPosition?: number;
  artists?: Artists;
  album?: Album;
  time?: number;
  href?: string;
};

export type Artists = Artist[];

export interface Artist extends Basic {
  data?: {
    playlistInfo: PlaylistInfo;
    tracks: Tracks;
    albums?: Album[];
  };
}
export interface Album extends Basic {
  service: Service;
}

export type Basic = {
  uri: string;
  name: string;
};

export type Tracks = Song[];

export type Collection = {
  playlistInfo: PlaylistInfo;
  tracks: Tracks;
};

export type PlaylistInfo = {
  id: string;
  name: string;
  service: Service;
  owner?: string;
  external_urls?: string;
  img?: string;
  description?: string;
  type?: ContentType;
};

export interface PlaylistParam {
  id: string;
  service: Service;
}

export type ContentType = "playlist" | "album" | "artist";

export type Service = "plaaaylist" | "spotify" | "youtube" | "soundcloud";

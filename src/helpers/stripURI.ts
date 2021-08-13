export const stripURI = (uri: string): string => {
  return uri.split(":")[2];
};

export const stripYoutubeURI = (uri: string): string => {
  return uri.split("v=")[1];
};

export const stripYoutubePlaylistURI = (uri: string): string => {
  return uri.split("list=")[1].split("&")[0];
};

export const stripSpotifyPlaylistURI = (uri: string): string => {
  return uri.split("playlist/")[1].split("?")[0];
};

export const stripSpotifyAlbumURI = (uri: string): string => {
  return uri.split("album/")[1].split("?")[0];
};

export const stripSpotifyTrackURI = (uri: string): string => {
  return uri.split("track/")[1].split("?")[0];
};

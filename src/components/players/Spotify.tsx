import React from "react";
import SpotifyPlayer from "react-spotify-web-playback";
interface SpotifyProps {
  token?: string;
  uris: string[];
}

export const Spotify: React.FC<SpotifyProps> = ({ token, uris }) => {
  if (token) {
    return <SpotifyPlayer token={token} name="plaaaylist player" uris={uris} />;
  }

  return <h1>Error4</h1>;
};

import React from "react";
import SpotifyPlayer from "react-spotify-web-playback";
interface SpotifyProps {
  token?: string;
}

export const Spotify: React.FC<SpotifyProps> = ({ token }) => {
  if (token) {
    return <SpotifyPlayer token={token} name="plaaaylist player" />;
  }

  return <h1>Error4</h1>;
};

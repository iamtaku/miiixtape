import React from "react";
import SpotifyPlayer from "react-spotify-web-playback";

export const Spotify = ({ token }: { token: string }) => {
  return <SpotifyPlayer token={token} />;
};

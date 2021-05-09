import React from "react";
import SpotifyPlayer from "react-spotify-web-playback";
interface SpotifyProps {
  token?: string;
  uris: string[];
  play: boolean;
}

export const Spotify: React.FC<SpotifyProps> = ({ token, uris, play }) => {
  if (token) {
    return (
      <SpotifyPlayer
        token={token}
        play={play}
        name="plaaaylist player"
        uris={uris}
      />
    );
  }

  return <h1>Error4</h1>;
};

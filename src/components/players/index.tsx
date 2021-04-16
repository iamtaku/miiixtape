import React from "react";
import { Spotify } from "./Spotify";
const Player = ({ token }: { token: string }) => {
  return (
    <div>
      <Spotify token={token} />
    </div>
  );
};

export default Player;

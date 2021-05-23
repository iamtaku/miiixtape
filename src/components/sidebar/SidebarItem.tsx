import React from "react";
import { Link } from "react-router-dom";
import { Playlist } from "../../types/types";

interface SideBarItemProps {
  playlist: Playlist;
}
export const SidebarItem: React.FC<SideBarItemProps> = ({ playlist }) => {
  //render different links based on whether spotify or other service.

  return (
    <div>
      <Link to={`/app/playlist/spotify/${playlist.playlistInfo.id}`}>
        {playlist.playlistInfo.name}
      </Link>
    </div>
  );
};

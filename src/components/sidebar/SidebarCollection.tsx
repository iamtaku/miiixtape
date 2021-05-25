import React from "react";
import { Playlist } from "../../types/types";
import { SidebarItem } from "./SidebarItem";
interface SidebarCollectionProps {
  data?: Playlist[];
}
export const SidebarCollection: React.FC<SidebarCollectionProps> = ({
  data,
}) => {
  return (
    <ul>
      {data?.map((item) => (
        <SidebarItem playlist={item} key={item.playlistInfo.id} />
      ))}
    </ul>
  );
};

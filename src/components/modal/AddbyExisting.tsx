import React from 'react'
import { useGetAllPlaylists, usePostPlaylistItems } from '../../queries/hooks';
import { Collection, Tracks } from '../../types/types';

interface IAddByExisting {
    // handleClick:(id: string)  => void,
    // playlists: Collection[] 
    tracks: Tracks;
}
export const AddbyExisting: React.FC<IAddByExisting>= ({tracks}) => {

  const { data: playlists } = useGetAllPlaylists();

  const mutation = usePostPlaylistItems();
  const handleClick = (id: string) => {
    mutation.mutate({ id, tracks });
    // setIsModalOpen(false);
  };


    return (
        <div>
                  <h3>Import Existing</h3>
      <ul>
        {playlists &&
          playlists.map((item) => {
            return (
              <li
                key={item.playlistInfo.id}
                onClick={() => handleClick(item.playlistInfo.id)}
              >
                <p>{item.playlistInfo.name}</p>
              </li>
            );
          })}
      </ul>

        </div>
    )
}

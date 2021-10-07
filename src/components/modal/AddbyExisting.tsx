import React, { useState } from 'react'
import { useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import client, { Spotify } from '../../queries/api/spotify/api'
import {
  useGetAllPlaylists,
  useGetAllSpotifyPlaylist,
  useGetUser,
} from '../../queries/hooks'
import { Collection } from '../../types/types'
import { List, Item as ItemStyles, Loading } from '../Shared'
import { AddPlaylistForm } from '../AddPlaylistForm'

const Item = styled(ItemStyles)`
  &:hover {
    cursor: pointer;
  }
`

const slideIn = keyframes`
  from {
    height: 0;
   opacity: 0;
  }

  to {
    height: auto;
    opacity: 1;
  } 
`

const Wrapper = styled.div`
  animation: ${slideIn} 0.5s both;
  height: 100%;
`

export const AddbyExisting: React.FC<{
  handleFetch: (collection: Collection) => void
  noSpotify?: boolean
}> = ({ handleFetch, noSpotify }) => {
  const { data: spotifyPlaylists, isLoading } = useGetAllSpotifyPlaylist()
  const { data: miiixtapPlaylists } = useGetAllPlaylists()
  const { data: userInfo } = useGetUser()
  const [playlists, setPlaylists] = useState<Collection[]>([])

  useEffect(() => {
    if (!spotifyPlaylists || !miiixtapPlaylists) return
    if (noSpotify) {
      setPlaylists(miiixtapPlaylists)
      return
    }
    setPlaylists(spotifyPlaylists)
  }, [noSpotify, spotifyPlaylists, miiixtapPlaylists])

  const handleClick = async (playlistInfo: Collection) => {
    if (!userInfo) return
    let playlist = playlistInfo
    if (!noSpotify) {
      playlist = await Spotify.getPlaylist(
        playlistInfo?.playlistInfo.id,
        client(userInfo?.access_token)
      )
    }
    handleFetch(playlist)
  }

  if (isLoading) return <Loading />

  return (
    <Wrapper>
      {playlists && playlists.length > 0 ? (
        <List>
          <AddPlaylistForm className={'create-new'}>
            <span style={{ marginRight: '8px' }}>Create new </span>
          </AddPlaylistForm>

          {playlists.map((playlist) => {
            return (
              <Item
                key={playlist.playlistInfo.id}
                onClick={() => handleClick(playlist)}
              >
                <p>{playlist.playlistInfo.name}</p>
              </Item>
            )
          })}
        </List>
      ) : (
        <p style={{ padding: '2px 24px' }}>
          You don&apos;t have any spotify playlists to import
        </p>
      )}
    </Wrapper>
  )
}

import axios from "axios";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GetAllPlaylists } from "../../queries/hooks/GetAllPlaylists";
import { GetAllSpotifyPlaylist } from "../../queries/hooks/GetAllSpotifyPlaylists";
import { GetSinglePlaylist } from "../../queries/hooks/GetSinglePlaylist";
import { useGlobalContext } from "../../state/context";

const SidebarWrapper = styled.div`
  grid-area: sidebar;
  max-width: 100%;
  background-color: var(--gray);
  /* border-radius: 50px; */
  padding: 16px 24px;
  span {
    font-size: 1.2rem;
    text-transform: uppercase;
    opacity: 0.8;
  }
`;

const PlaylistItem = styled.div`
  width: 100%;
  a {
    overflow: hidden;
  }
`;

interface PlaylistPost {
  data: {
    playlist: {
      name: string;
    };
  };
}

const postPlaylist = async (name: string) => {
  const token = window.localStorage.getItem("token");
  if (!token) throw Error("no token");

  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const body = {
    playlist: {
      name,
    },
  };

  const url = `${process.env.REACT_APP_BASE_URL}/playlists`;
  return await axios.post<PlaylistPost>(url, body, headers);
};

export const Sidebar = () => {
  const { data: spotifyPlaylists } = GetAllSpotifyPlaylist();
  const { data: playlists, isLoading, error } = GetAllPlaylists();
  const [input, setInput] = useState("");
  const queryClient = useQueryClient();
  const mutation = useMutation(postPlaylist, {
    onSuccess: () => {
      queryClient.invalidateQueries("playlistAll");
    },
  });

  const handleClick = (id: string) => {
    console.log(id);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate(input);
    setInput("");
  };
  return (
    <SidebarWrapper>
      <span>Spotify Playlists</span>
      {spotifyPlaylists?.items.map((item) => {
        return (
          <PlaylistItem key={item.id}>
            <Link to={`/app/playlist/spotify/${item.id}`}>{item.name}</Link>
          </PlaylistItem>
        );
      })}
      <span>Playlists</span>
      {playlists?.map((item) => (
        <PlaylistItem key={item.playlistInfo.id}>
          <Link to={`/app/playlist/plaaaylist/${item.playlistInfo.id}`}>
            {item.playlistInfo.name}
          </Link>
        </PlaylistItem>
      ))}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
        />
      </form>
    </SidebarWrapper>
  );
};

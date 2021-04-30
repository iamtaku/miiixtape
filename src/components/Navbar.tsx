import styled from "styled-components";
import SpotifyWebApi from "spotify-web-api-js";
import { useQueryClient, useQuery } from "react-query";
import { Profile } from "./Profile";
import { SearchBar } from "./SearchBar";
import { GetSpotifyUser, GetUser } from "../queries";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const NavBar = styled.nav`
  /* display: flex; */
  /* width: 100%; */

  ul {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }

  li {
    margin: 0 16px;
  }
`;

const getSpotifyInfo = async (access_token?: string, spotify_id?: string) => {
  console.log("called");
  if (access_token && spotify_id) {
    const client = new SpotifyWebApi();
    client.setAccessToken(access_token);
    console.log(access_token, spotify_id, client);
    return await client.getUser(spotify_id);
  }
};

interface UserInfo {
  access_token: string;
  refresh_token: string;
  username: string;
  spotify_id: string;
}

export const Navbar: React.FC = () => {
  const { data: userInfo } = GetUser();
  console.log(userInfo);
  const { data, isLoading, error } = GetSpotifyUser(userInfo);

  useEffect(() => {
    if (typeof data != undefined && data?.images) {
      const img = data.images[0].url;
      window.localStorage.setItem("profileImg", img);
    }
  }, [data]);

  //store img url in local storage so we don't fetch it each time and re-render the navbar;

  if (error) {
    return <h2>there is an error</h2>;
  }
  return (
    <NavBar>
      <ul>
        <li>
          <Link to="/app">
            <h1>Plaaaylist</h1>
          </Link>
        </li>
        <li>
          <SearchBar />
        </li>
        <li>
          {data && data.images && (
            <Profile uri={data.images[0].url} displayName={data.display_name} />
          )}
        </li>
      </ul>
    </NavBar>
  );
};

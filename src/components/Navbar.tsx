import styled from "styled-components";
import SpotifyWebApi from "spotify-web-api-js";
import { useQueryClient, useQuery } from "react-query";
import { Profile } from "./Profile";
import { SearchBar } from "./SearchBar";
import { GetUser } from "../queries/GetUser";
import { GetSpotifyUser } from "../queries/GetSpotifyUser";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ProfilePlaceholder } from "./Placeholder";
import { GetToken } from "../queries/GetToken";

const NavBar = styled.nav`
  grid-area: nav;
  margin-top: 8px;
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

export const Navbar: React.FC = () => {
  const { data: token } = GetToken();
  const { data: userInfo } = GetUser(token);
  // console.log(userInfo);
  const { data, isLoading, error } = GetSpotifyUser(userInfo);

  console.log(data);
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
          {isLoading ? (
            <ProfilePlaceholder />
          ) : (
            data &&
            data.images && (
              <Profile
                uri={data?.images[0].url}
                displayName={data?.display_name}
                isLoading={isLoading}
                href={data.external_urls.spotify}
              />
            )
          )}
        </li>
      </ul>
    </NavBar>
  );
};

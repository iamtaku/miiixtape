import styled from "styled-components";
import SpotifyWebApi from "spotify-web-api-js";
import { useQueryClient, useQuery } from "react-query";
import { Profile } from "./Profile";
import { SearchBar } from "./SearchBar";
import { ProfilePlaceholder } from "./Placeholder";
import { GetSpotifyUser, GetUser } from "../queries";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const NavBar = styled.nav`
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
  const { data: userInfo } = GetUser();
  // console.log(userInfo);
  const { data, isLoading, error } = GetSpotifyUser(userInfo);

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
          {isLoading ? (
            <ProfilePlaceholder />
          ) : (
            data &&
            data.images && (
              <Profile
                uri={data?.images[0].url}
                displayName={data?.display_name}
              />
            )
          )}
        </li>
      </ul>
    </NavBar>
  );
};

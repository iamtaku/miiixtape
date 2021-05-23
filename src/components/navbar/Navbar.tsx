import styled from "styled-components";
import { Profile } from "./Profile";
import { SearchBar } from "./SearchBar";
import { GetSpotifyUser } from "../../queries/hooks/GetSpotifyUser";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ProfilePlaceholder } from "../placeholders/Placeholder";

const NavBar = styled.nav`
  grid-area: nav;
  /* margin: 8px; */
  display: flex;
  align-items: center;
  h1 {
    color: var(--accent);
  }
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
  const { data, isLoading, error } = GetSpotifyUser();

  return (
    <NavBar>
      <ul>
        <li>
          <Link to="/app">
            <h1>PLAAAYLIST</h1>
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

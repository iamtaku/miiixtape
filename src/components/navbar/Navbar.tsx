import styled from "styled-components";
import { Profile } from "./Profile";
import { SearchBar } from "./SearchBar";
import { GetSpotifyUser } from "../../queries/hooks/GetSpotifyUser";
import React from "react";
import { Link } from "react-router-dom";

const NavBar = styled.nav`
  grid-area: nav;
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
          <Profile />
        </li>
      </ul>
    </NavBar>
  );
};

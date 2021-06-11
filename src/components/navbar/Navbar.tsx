import styled from "styled-components";
import { Profile } from "./Profile";
import { SearchBar } from "./SearchBar";
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
    align-items: center;
    width: 100%;
    justify-content: space-between;
  }
`;

export const Navbar: React.FC = () => {
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

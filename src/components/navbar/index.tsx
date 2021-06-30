import styled from "styled-components";
import { Profile } from "./Profile";
import { SearchBar } from "./SearchBar";
import React from "react";
import { Link } from "react-router-dom";

const NavBar = styled.nav`
  grid-area: nav;
  display: flex;
  align-items: center;
`;

const List = styled.ul`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const Title = styled.h1`
  color: var(--accent);
`;
export const Navbar: React.FC = () => {
  return (
    <NavBar>
      <List>
        <li>
          <Link to="/app">
            <Title>PLAAAYLIST</Title>
          </Link>
        </li>
        <li>
          <SearchBar />
        </li>
        <li>
          <Profile />
        </li>
      </List>
    </NavBar>
  );
};

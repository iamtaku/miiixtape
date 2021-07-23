import styled from "styled-components";
import { Profile } from "./Profile";
import { SearchBar } from "./SearchBar";
import React from "react";
import { Link } from "react-router-dom";

const NavBar = styled.nav`
  grid-area: nav;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  justify-content: space-between;
`;

const Title = styled.h1`
  color: var(--accent);
`;

const HomeSection = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 8px;
`;
export const Navbar: React.FC = () => {
  return (
    <NavBar>
      <List>
        <HomeSection>
          <li>
            <Link to="/app">
              <Title>miiixtape</Title>
            </Link>
          </li>
          <li>
            <Profile />
          </li>
        </HomeSection>
        {/* <li style={{ width: "100%" }}>
          <SearchBar />
        </li> */}
      </List>
    </NavBar>
  );
};

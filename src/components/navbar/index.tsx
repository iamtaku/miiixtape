import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.nav`
  width: 100%;
  padding: 16px;
`;

const List = styled.ul`
  display: flex;
  justify-content: space-between;
`;

const Item = styled.li``;

const Logo = () => <span>miiixtape</span>;

const Button = styled(Link)`
  background: none;
  padding: 8px;
  border: none;
  margin: 0 8px;
  border-radius: 8px;
`;
const Buttons = () => (
  <div>
    <Button
      to={"/app"}
      style={{
        border: "1px solid var(--secondary)",
        color: "var(--secondary)",
      }}
    >
      Open Player
    </Button>
    <Button
      to={"/login"}
      style={{ border: "1px solid var(--accent", color: "var(--accent)" }}
    >
      Login
    </Button>
  </div>
);

export const Navbar = () => {
  return (
    <Container>
      <List>
        <Item>
          <Logo />
        </Item>
        <Item>
          <Buttons />
        </Item>
      </List>
    </Container>
  );
};

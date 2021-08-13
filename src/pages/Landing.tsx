// import { LoginButton } from "../components/Buttons";
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Navbar } from "../components/navbar";

const LandingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Hero = () => (
  <Container>
    <h1>Create Your Digital Mixtape</h1>
    <Link to="/login">Login </Link>
  </Container>
);

const Landing = (): JSX.Element => {
  return (
    <LandingWrapper>
      <Navbar />
      <Hero />
    </LandingWrapper>
  );
};

export default Landing;

import { LoginButton } from "../components/Buttons";
import styled from "styled-components";
import { Link } from "react-router-dom";

const LandingWrapper = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const Landing = () => {
  return (
    <LandingWrapper>
      <h1>this is the landing page!</h1>
      <Link to="/login">Login with Spotify</Link>
    </LandingWrapper>
  );
};

export default Landing;

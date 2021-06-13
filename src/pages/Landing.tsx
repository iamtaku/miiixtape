import { LoginButton } from "../components/Buttons";
import styled from "styled-components";

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
      <LoginButton>Login with Spotify</LoginButton>
    </LandingWrapper>
  );
};

export default Landing;

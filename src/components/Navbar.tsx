import { GetUser } from "../queries";
// import { User } from
import styled from "styled-components";
import SpotifyWebApi from "spotify-web-api-js";

interface NavbarProps {
  ref: any;
}

const NavBar = styled.nav`
  display: flex;
  justify-content: space-around;
`;

export const Navbar: React.FC<NavbarProps> = ({ ref }) => {
  const { data } = GetUser();
  // console.log(spotifyClient.current.access_token);
  // if (spotifyClient && spotifyClient.getAccessToken()) {
  // spotifyClient.getFeaturedPlaylists().then((res: any) => console.log(res));
  // spotifyClient.searchTracks("hello").then((res: any) => {
  // console.log(res);
  // }
  console.log(ref);
  return (
    <NavBar>
      <ul>
        <li>{data?.username}</li>
      </ul>
    </NavBar>
  );
};

import { GetUser } from "../queries";
// import { User } from
import styled from "styled-components";
import SpotifyWebApi from "spotify-web-api-js";
import { useQueryClient, useQuery } from "react-query";
import { Profile } from "./Profile";

interface NavbarProps {
  // spotifyInfo?: SpotifyApi.UserProfileResponse;
  spotifyData: {
    token?: string;
    spotifyId?: string;
  };
}

const NavBar = styled.nav`
  display: flex;
  justify-content: space-around;
`;

const getSpotifyInfo = async ({ access_token, spotify_id }: UserInfo) => {
  const client = new SpotifyWebApi();
  client.setAccessToken(access_token);
  return await client.getUser(spotify_id);
};

interface UserInfo {
  access_token: string;
  refresh_token: string;
  username: string;
  spotify_id: string;
}

export const Navbar: React.FC = () => {
  const queryClient = useQueryClient();
  const userInfo = queryClient.getQueryData<UserInfo>("userInfo")!;
  console.log(userInfo);
  const { data, isLoading, error } = useQuery(
    "spotifyInfo",
    async () => await getSpotifyInfo(userInfo),
    {
      enabled: !!userInfo,
    }
  );
  console.log(data);
  if (error) {
    return <h2>there is an error</h2>;
  }
  return (
    <NavBar>
      <ul>
        <li>{data?.display_name}</li>
        <li>
          {data && data.images && (
            <Profile uri={data.images[0].url} displayName={data.display_name} />
          )}
        </li>
      </ul>
    </NavBar>
  );
};

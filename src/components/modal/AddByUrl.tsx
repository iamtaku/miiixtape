import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import {
  stripSpotifyAlbumURI,
  stripSpotifyPlaylistURI,
  stripSpotifyTrackURI,
  stripYoutubePlaylistURI,
  stripYoutubeURI,
} from "../../helpers/stripURI";
import { Youtube, SoundCloud, Spotify } from "../../queries/api/";
import { mapSCTracktoTrack } from "../../queries/api/soundcloud/mapping";
import client from "../../queries/api/spotify/api";
import { useGetUser } from "../../queries/hooks";
import { SearchBarWrapper } from "../sidebar/nav/SearchBar";
import { Collection, PlaylistInfo, Service } from "../../types/types";

interface IAddByUrl {
  handleFetch: (collection: Collection) => void;
}

const Container = styled.div`
  padding: 4px;
  margin: 8px 0;
`;

const FormWrapper = styled(SearchBarWrapper)<{ error: Boolean }>`
  background: (var--primary);
  margin: 8px 0;
  border: ${(props) => (props.error ? "1px solid var(--red)" : "none")};
  form {
    display: flex;
  }
`;

const Input = styled.input`
  flex-grow: 5;
  padding: 4px;
`;

const EnterBtn = styled.input`
  background: none;
  border: none;
  color: var(--accent) !important;
  opacity: 1 !important;
  width: auto !important;
  flex-grow: 0.5;
  &:hover {
    cursor: pointer;
  }
`;

const Status = styled.div``;

const Loading = () => <p>Loading...</p>;
const Success = () => <p>Success...</p>;
const Error = () => <p>Error...</p>;

const findService = (input: string): Service | false => {
  if (input.includes("youtube")) {
    return "youtube";
  }

  if (input.includes("spotify")) {
    return "spotify";
  }

  if (input.includes("soundcloud")) {
    return "soundcloud";
  }
  return false;
};

const fetchYoutube = async (uri: string): Promise<Collection> => {
  if (uri.includes("list")) {
    //if playlist
    const stripped = stripYoutubePlaylistURI(uri);
    const playlist = await Youtube.getPlaylist(stripped);
    return playlist;
  }
  const fetchURI = stripYoutubeURI(uri);
  const data = await Youtube.getVideo(fetchURI);
  const playlistInfo: PlaylistInfo = {
    id: "",
    name: "",
    owner: "",
    service: "youtube",
  };
  return {
    playlistInfo,
    tracks: data,
  };
};

const fetchSpotify = async (
  uri: string,
  token: string
): Promise<Collection | undefined> => {
  if (uri.includes("playlist")) {
    const strippedURI = stripSpotifyPlaylistURI(uri);
    const data = await Spotify.getPlaylist(strippedURI, client(token));
    return data;
  }

  if (uri.includes("album")) {
    const strippedURI = stripSpotifyAlbumURI(uri);
    const data = await Spotify.getAlbum(strippedURI, client(token));
    return data;
  }

  const strippedURI = stripSpotifyTrackURI(uri);
  const data = await Spotify.getTracks([strippedURI], client(token));
  return {
    playlistInfo: { id: "", name: "", owner: "", service: "spotify" },
    tracks: data,
  };
};

const mapSoundCloudPlaylistInfo = (data: any): PlaylistInfo => {
  return {
    id: data.id,
    name: data.title,
    service: "soundcloud",
    external_urls: data.permalink_url,
    type: "playlist",
  };
};

const fetchSC = async (uri: string): Promise<Collection> => {
  const trackInfo = await SoundCloud.getTrackInfo(uri);
  const playlistInfo = mapSoundCloudPlaylistInfo(trackInfo);
  const data = trackInfo.tracks.map(mapSCTracktoTrack);
  return {
    playlistInfo,
    tracks: data,
  };
};

export const AddByUrl: React.FC<IAddByUrl> = ({ handleFetch }) => {
  const history = useHistory();
  const { data: userInfo } = useGetUser();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchURL = async (uri: string): Promise<Collection | undefined> => {
    if (
      !history.location.pathname.includes("plaaaylist") ||
      userInfo === undefined
    )
      return;
    const service = findService(uri);
    switch (service) {
      case "youtube":
        return await fetchYoutube(uri);
      case "spotify":
        return await fetchSpotify(uri, userInfo.access_token);
      case "soundcloud":
        return await fetchSC(uri);
      default:
        throw Error();
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setIsError(false);

    try {
      const data = await fetchURL(input);
      data && handleFetch(data);
      // if (!data) throw Error();
      // const tracks = Array.isArray(data) ? data : [data];
      // if (data && tracks) {
      //   mutation
      //     .mutateAsync({ id, tracks })
      //     .then((data) => {
      //       console.log(data);
      //       setIsLoading(false);
      //       setIsSuccess(true);
      //     })
      //     .catch((err) => {
      //       throw Error();
      //     });
      // }
    } catch (err) {
      console.error(err);
      setIsSuccess(false);
      setIsLoading(false);
      setIsError(true);
    }
  };

  return (
    <Container>
      <h3>Add by URL</h3>
      <FormWrapper error={isError}>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.currentTarget.value)}
            placeholder="Enter Spotify, Soundcloud or Youtube URL's"
          />
          {!isLoading && <EnterBtn type="submit" value="FETCH" />}
          {isLoading && <Loading />}
        </form>
      </FormWrapper>
      <Status>{isError && <Error />}</Status>
    </Container>
  );
};

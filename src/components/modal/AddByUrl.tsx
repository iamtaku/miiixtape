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
import { useGetUser, usePostPlaylistItems } from "../../queries/hooks";
import { SearchBarWrapper } from "../sidebar/nav/SearchBar";
import { Service, Tracks } from "../../types/types";

interface IAddByUrl {
  id: string;
}

const FormWrapper = styled(SearchBarWrapper)`
  background: var(--primary);
  form {
    display: flex;
  }
`;

const Input = styled.input<{ error: Boolean }>`
  flex-grow: 5;
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

const fetchYoutube = async (uri: string): Promise<Tracks> => {
  if (uri.includes("list")) {
    const stripped = stripYoutubePlaylistURI(uri);
    const data = await Youtube.getPlaylist(stripped);
    return data;
  }
  const fetchURI = stripYoutubeURI(uri);
  const data = await Youtube.getVideo(fetchURI);
  return [data];
};

const fetchSpotify = async (
  uri: string,
  token: string
): Promise<Tracks | undefined> => {
  if (uri.includes("playlist")) {
    const strippedURI = stripSpotifyPlaylistURI(uri);
    const data = await Spotify.getPlaylist(strippedURI, client(token));
    return data.tracks;
  }

  if (uri.includes("album")) {
    const strippedURI = stripSpotifyAlbumURI(uri);
    const data = await Spotify.getAlbum(strippedURI, client(token));
    return data.tracks;
  }

  const strippedURI = stripSpotifyTrackURI(uri);
  const data = await Spotify.getTracks([strippedURI], client(token));
  return data;
};
const fetchSC = async (uri: string): Promise<Tracks> => {
  const trackInfo = await SoundCloud.getTrackInfo(uri);
  const data = trackInfo.tracks.map(mapSCTracktoTrack);
  return data;
};

export const AddByUrl: React.FC<IAddByUrl> = ({ id }) => {
  const history = useHistory();
  const mutation = usePostPlaylistItems();
  const { data: userInfo } = useGetUser();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchURL = async (uri: string): Promise<Tracks | undefined> => {
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
        break;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setIsError(false);

    try {
      const data = await fetchURL(input);
      if (!data) throw Error();
      const tracks = Array.isArray(data) ? data : [data];
      if (data && tracks) {
        mutation
          .mutateAsync({ id, tracks })
          .then((data) => {
            console.log(data);
            setIsLoading(false);
            setIsSuccess(true);
          })
          .catch((err) => {
            throw Error();
          });
      }
    } catch (err) {
      console.error(err);
      setIsSuccess(false);
      setIsLoading(false);
      setIsError(true);
    }
  };

  return (
    <div>
      <h3>Add by URL</h3>
      <FormWrapper>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.currentTarget.value)}
            error={isError}
            placeholder="Enter Spotify, Soundcloud or Youtube URL's"
          />
          <EnterBtn type="submit" value="ADD" />
        </form>
      </FormWrapper>
      <Status>
        {isLoading && <Loading />}
        {isSuccess && <Success />}
        {isError && <Error />}
      </Status>
    </div>
  );
};

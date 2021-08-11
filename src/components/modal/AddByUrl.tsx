import React, { useState } from "react";
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
import { Loading, Error } from "./Shared";

interface IAddByUrl {
  handleFetch: (collection: Collection) => void;
}

const FormWrapper = styled(SearchBarWrapper)<{ error: boolean }>`
  background: (var--primary);
  border: ${(props) =>
    props.error ? "1px solid var(--red)" : "1px solid transparent"};
  form {
    display: grid;
    grid-template-columns: 1fr 0.2fr;
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
    const stripped = stripYoutubePlaylistURI(uri);
    const playlist = await Youtube.getPlaylist(stripped);
    return playlist;
  }
  const fetchURI = stripYoutubeURI(uri);
  debugger;
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
): Promise<Collection> => {
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
  debugger;
  const trackInfo = await SoundCloud.getTrackInfo(uri);
  const playlistInfo = mapSoundCloudPlaylistInfo(trackInfo);
  const data = trackInfo.tracks.map(mapSCTracktoTrack);
  return {
    playlistInfo,
    tracks: data,
  };
};

export const AddByUrl: React.FC<IAddByUrl> = ({ handleFetch }) => {
  const { data: userInfo } = useGetUser();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchURL = async (uri: string): Promise<Collection> => {
    if (userInfo === undefined) throw Error();
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
    } catch (err) {
      console.error(err);
      setIsSuccess(false);
      setIsLoading(false);
      setIsError(true);
    }
  };

  return (
    <>
      <FormWrapper error={isError}>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.currentTarget.value)}
            placeholder="Enter Spotify, Soundcloud or Youtube URL's"
            onFocus={() => setIsError(false)}
          />
          {!isLoading && !isError && <EnterBtn type="submit" value="FETCH" />}
          {isLoading && <Loading />}
          {isError && <Error />}
        </form>
      </FormWrapper>
      <Status>
        {isError && (
          <span style={{ opacity: "0.8" }}>
            Something went wrong... Try checking the url.
          </span>
        )}
      </Status>
    </>
  );
};

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { IoIosWarning } from "react-icons/io";
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

const FormWrapper = styled(SearchBarWrapper)<{ error: boolean }>`
  background: (var--primary);
  margin: 8px 0;
  border: ${(props) =>
    props.error ? "1px solid var(--red)" : "1px solid transparent"};
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

const Loader = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  div {
    position: absolute;
    top: calc(50%);
    left: 0;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border-radius: 50%;
    background: #fff;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
  }
  div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }
`;

const Loading = () => (
  <Loader>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </Loader>
);
const Success = () => <p>Success...</p>;
const Error = () => (
  <IoIosWarning style={{ color: "var(--red)", placeSelf: "center end" }} />
);

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

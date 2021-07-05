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
import { useGetUser, usePostPlaylistItems } from "../../queries/hooks";
import { Service, Song, Tracks } from "../../types/types";

interface IAddByUrl {
  id: string;
}

const Input = styled.input<{ error: Boolean }>`
  width: 50%;
`;

const EnterBtn = styled.button``;

const Status = styled.div``;

const Loading = () => <p>Loading...</p>;
const Success = () => <p>Success...</p>;
const Error = () => <p>Error...</p>;

export const AddByUrl: React.FC<IAddByUrl> = ({ id }) => {
  const mutation = usePostPlaylistItems();
  const { data: userInfo } = useGetUser();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

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
    const fetchURI = stripYoutubeURI(input);
    const data = await Youtube.getVideo(fetchURI);
    console.log(data);
    return [data];
  };
  const fetchSpotify = async (uri: string): Promise<Tracks | undefined> => {
    if (!userInfo?.access_token) return;

    if (uri.includes("playlist")) {
      const strippedURI = stripSpotifyPlaylistURI(uri);
      const data = await Spotify.getPlaylist(
        strippedURI,
        client(userInfo?.access_token)
      );
      return data.tracks;
    }

    if (uri.includes("album")) {
      const strippedURI = stripSpotifyAlbumURI(uri);
      const data = await Spotify.getAlbum(
        strippedURI,
        client(userInfo?.access_token)
      );
      return data.tracks;
    }

    const strippedURI = stripSpotifyTrackURI(uri);
    const data = await Spotify.getTracks(
      [strippedURI],
      client(userInfo?.access_token)
    );
    return data;
  };

  const fetchSC = async (uri: string): Promise<Tracks> => {
    const trackInfo = await SoundCloud.getTrackInfo(uri);
    const data = trackInfo.tracks.map((item: any) => mapSCTracktoTrack(item));
    debugger;
    return data;
  };

  const fetchURL = async (
    service: Service,
    uri: string
  ): Promise<Tracks | undefined> => {
    switch (service) {
      case "youtube":
        return await fetchYoutube(uri);
      case "spotify":
        return await fetchSpotify(uri);
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
    const service = findService(input);
    if (!service) {
      setIsLoading(false);
      setIsError(true);
      return;
    }
    try {
      const data = await fetchURL(service, input);
      setIsLoading(false);
      if (data === undefined) throw Error();
      const tracks = Array.isArray(data) ? data : [data];
      data && tracks && mutation.mutate({ id, tracks });
      setIsSuccess(true);
    } catch {
      setIsLoading(false);
      setIsError(true);
    }
  };
  //      const data = await SoundCloud.getTrack(input);
  //      const tracks = mapSoundCloudTrackToTrack(data);
  //      mutation.mutate({ id, tracks });
  //

  //check if valid input
  //if valid => // case for each service(youtube/spotify/soundcloud)
  // store details in database
  // if success, invalidate react query to refetch data
  //

  return (
    <div>
      <h3>Add by URL</h3>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
          error={isError}
        />
        <EnterBtn>Add</EnterBtn>
      </form>
      <Status>
        {isLoading && <Loading />}
        {isSuccess && <Success />}
        {isError && <Error />}
      </Status>
    </div>
  );
};

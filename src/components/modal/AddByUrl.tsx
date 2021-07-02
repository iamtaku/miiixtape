import React, { useState } from "react";
import styled from "styled-components";
import { stripYoutubeURI } from "../../helpers/stripURI";
import { Youtube, SoundCloud } from "../../queries/api/";
import { usePostPlaylistItems } from "../../queries/hooks";
import { Service, Song } from "../../types/types";

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
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const isValid = (input: string) => {
    if (input.includes("youtube")) {
      return "youtube";
    }
    return false;
  };

  const fetchYoutube = async (uri: string) => {
    const fetchURI = stripYoutubeURI(input);
    return await Youtube.getVideo(fetchURI);
  };

  const fetchSC = async (uri: string) => {};

  const fetchURL = async (
    service: Service,
    uri: string
  ): Promise<Song | undefined> => {
    switch (service) {
      case "youtube":
        return await fetchYoutube(uri);
      default:
        break;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const service = isValid(input);
    if (!service) {
      setIsLoading(false);
      setIsError(true);
      return;
    }
    try {
      const data = await fetchURL(service, input);
      setIsLoading(false);
      data && mutation.mutate({ id, tracks: [data] });
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

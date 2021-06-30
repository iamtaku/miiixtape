import React ,{useState}from 'react'
import styled from 'styled-components';
import { stripYoutubeURI } from '../../helpers/stripURI';
import { SoundCloud, Youtube } from "../../queries/api";

const Input = styled.input`
  width: 50%;
`;

export const AddByUrl = () => {

  const [input, setInput] = useState("");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (input.includes("youtube")) {
      const uri = stripYoutubeURI(input);
      debugger;
      uri && Youtube.getVideo(uri).then((res) => console.log(res));
    }
    //      const data = await SoundCloud.getTrack(input);
    //      const tracks = mapSoundCloudTrackToTrack(data);
    //      mutation.mutate({ id, tracks });
  };

    return (
        <div>
<h3>Add by URL</h3>           
<form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
        />
      </form>

        </div>
    )
}

import styled from "styled-components";
import { Playlist, PlaylistInfo, Service, Tracks } from "../../../types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube, faSpotify } from "@fortawesome/free-brands-svg-icons";

interface InnerGridDescriptionProps {
  services?: Service[];
  data: Playlist;
}

const InnerGridDescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ServiceWrapper = styled.div`
  display: flex;
  margin-left: 16px;
  svg {
    margin-right: 8px;
  }
`;

const PlaybackTypesWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    padding: 4px 8px;
    background: var(--light-gray);
    border-radius: 8px;
    font-size: 12px;
  }
`;

const setIcon = (service: Service, index: number) => {
  switch (service) {
    case "spotify":
      return <FontAwesomeIcon icon={faSpotify} key={index} />;
    case "youtube":
      return <FontAwesomeIcon icon={faYoutube} key={index} />;
  }
};

const GridDescriptionServices = ({ services }: { services?: Service[] }) => (
  <ServiceWrapper>
    {services?.map((service, index) => setIcon(service, index))}
  </ServiceWrapper>
);

export const InnerGridDescription: React.FC<InnerGridDescriptionProps> = ({
  data,
  services,
}) => (
  <InnerGridDescriptionWrapper>
    <PlaybackTypesWrapper>
      <p>{data.playlistInfo.type}</p>
      <GridDescriptionServices services={services} />
    </PlaybackTypesWrapper>
    <h1>{data.playlistInfo.name}</h1>
    {data.tracks && <p>{`${data.tracks.length} Tracks`}</p>}
  </InnerGridDescriptionWrapper>
);

import styled from "styled-components";
import { Service } from "../../types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube, faSpotify } from "@fortawesome/free-brands-svg-icons";

interface InnerGridDescriptionProps {
  name: string;
  type?: string;
  services?: Service[];
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
  name,
  type,
  services,
}) => (
  <InnerGridDescriptionWrapper>
    <PlaybackTypesWrapper>
      <p>{type && type}</p>
      <GridDescriptionServices services={services} />
    </PlaybackTypesWrapper>
    <h1>{name}</h1>
  </InnerGridDescriptionWrapper>
);

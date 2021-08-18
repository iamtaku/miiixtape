import React from "react";
import styled from "styled-components";
import { Collection, Service } from "../../types/types";
import { device } from "../../globalStyle";
import { setIcon } from "../Shared";

interface IProps {
  services?: Service[];
  data: Collection;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;
const ServiceWrapper = styled.div`
  display: flex;
  margin-left: 16px;

  svg {
    margin-right: 8px;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.span`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: left;

  @media ${device.laptop} {
    font-size: 2.5rem;
  }
`;

const Tag = styled.span`
  background: var(--light-gray);
  border-radius: 8px;
  padding: 2px 8px;
  font-size: 0.9rem;
`;

export const Description: React.FC<IProps> = ({ data, services }) => {
  return (
    <Wrapper>
      <Container>
        <Tag>{data.playlistInfo.type}</Tag>
        <ServiceWrapper>
          {services?.map((service, index) => setIcon(service, index))}
        </ServiceWrapper>
      </Container>
      <Title>{data.playlistInfo.name}</Title>
      {data.tracks.length > 0 && <span>{`${data.tracks.length} Tracks`}</span>}
    </Wrapper>
  );
};

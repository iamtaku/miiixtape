import React, { useState } from "react";
import styled from "styled-components";
import { Collection, PlaylistParam, Service } from "../../types/types";
import { device } from "../../globalStyle";
import { setIcon } from "../Shared";
import { usePatchPlaylist } from "../../queries/hooks";
import { useParams } from "react-router-dom";
import { useIsOwner } from "../../helpers/hooks";

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

const Form = styled.form`
  background: none;
  border: none;
  width: 100%;
`;
const Input = styled.input`
  background: none;
  border: none;
  color: var(--white);
`;
const EditForm: React.FC<{ data: Collection; closeIsEditable: () => void }> = ({
  data,
  closeIsEditable,
}) => {
  const [titleVal, setTitleVal] = useState(data.playlistInfo.name);
  const mutation = usePatchPlaylist();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("i was submitted");
    if (titleVal.trim()) {
      const payload = {
        id: data.playlistInfo.id,
        name: titleVal,
      };
      mutation.mutateAsync(payload).then(() => closeIsEditable());
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={titleVal}
        onChange={(e) => setTitleVal(e.currentTarget.value)}
        onBlur={closeIsEditable}
      />
    </Form>
  );
};

export const Description: React.FC<IProps> = ({ data, services }) => {
  const [isEditable, setIsEditable] = useState(false);
  const { id } = useParams<PlaylistParam>();
  const { isOwner, isEditable: isEditablePlaylist } = useIsOwner(id);
  const handleOnDoubleClick = () => {
    console.log("double clicked");
    setIsEditable(true);
  };

  const closeIsEditable = () => setIsEditable(false);
  return (
    <Wrapper>
      <Container>
        <Tag className={"description-hideable"}>{data.playlistInfo.type}</Tag>
        <ServiceWrapper className={"description-hideable"}>
          {services?.map((service, index) => setIcon(service, index))}
        </ServiceWrapper>
      </Container>
      <Title onDoubleClick={handleOnDoubleClick} className="title-shrinkable">
        {(isOwner || isEditablePlaylist) && isEditable ? (
          <EditForm data={data} closeIsEditable={closeIsEditable} />
        ) : (
          data.playlistInfo.name
        )}
      </Title>
      {data.tracks.length > 0 && (
        <span
          className={"description-hideable"}
        >{`${data.tracks.length} Tracks`}</span>
      )}
    </Wrapper>
  );
};

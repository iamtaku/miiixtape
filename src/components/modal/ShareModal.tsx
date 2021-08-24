import React from "react";
import styled from "styled-components";
import { useIsOwner } from "../../helpers/hooks";
import { useGlobalContext } from "../../state/context";
import { ModalSection } from "../Shared";

const Wrapper = styled.div`
  /* width: 500px; */
  /* overflow: hidden; */
`;
const Input = styled.input`
  width: 100%;
`;
export const ShareModal: React.FC = () => {
  const { state } = useGlobalContext();
  const { isOwner } = useIsOwner(state.ui.currentModalId);

  return (
    <Wrapper>
      {isOwner && (
        <ModalSection title="Make Playlist Editable by others?"></ModalSection>
      )}
      <ModalSection title="Share this Playlist">
        <button
          onClick={() => navigator.clipboard.writeText(window.location.href)}
        >
          <Input type="text" value={window.location.href} readOnly />
        </button>
      </ModalSection>
    </Wrapper>
  );
};

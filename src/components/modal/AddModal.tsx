import React, { useState } from "react";
import styled from "styled-components";
import { ModalSection } from ".";
import { useGlobalContext } from "../../state/context";
import { Collection } from "../../types/types";
import { AddbyExisting } from "./AddbyExisting";
import { AddByUrl } from "./AddByUrl";
import { Confirm } from "./Confirm";

const Wrapper = styled.div`
  width: 500px;
`;

export const AddModal = () => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [data, setData] = useState<Collection>();
  const handleFetch = async (collection: Collection) => {
    setData(collection);
    setIsConfirmOpen(true);
    console.log(collection);
  };

  const handleConfirmClose = () => setIsConfirmOpen(false);

  return (
    <>
      {isConfirmOpen && data ? (
        <Wrapper>
          <Confirm data={data} handleConfirmClose={handleConfirmClose} />
        </Wrapper>
      ) : (
        <Wrapper>
          <ModalSection title={"Add by URL"}>
            <AddByUrl handleFetch={handleFetch} />
          </ModalSection>
          <ModalSection title={"Add by Importing existing playlists"}>
            <AddbyExisting />
          </ModalSection>
        </Wrapper>
      )}
    </>
  );
};

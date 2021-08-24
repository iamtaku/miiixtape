import React, { useState } from "react";
import styled from "styled-components";
import { ModalSection } from "../Shared";
import { Collection } from "../../types/types";
import { AddbyExisting } from "./AddbyExisting";
import { AddByUrl } from "./AddByUrl";
import { Confirm } from "./Confirm";

const Wrapper = styled.div`
  /* width: 500px; */
  overflow: hidden;
`;

export const AddModal = (): JSX.Element => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isExistingOpen, setIsExistingOpen] = useState(false);
  const [data, setData] = useState<Collection>();
  const handleFetch = (collection: Collection) => {
    setData(collection);
    setIsConfirmOpen(true);
    console.log(collection);
  };

  const handleConfirmClose = () => setIsConfirmOpen(false);
  const handleOpenAddByExisting = () => setIsExistingOpen(!isExistingOpen);

  return (
    <>
      {isConfirmOpen && data ? (
        <Wrapper>
          <Confirm data={data} handleConfirmClose={handleConfirmClose} />
        </Wrapper>
      ) : (
        <Wrapper>
          <ModalSection title={<span>Add by URL</span>}>
            <AddByUrl handleFetch={handleFetch} />
          </ModalSection>
          <ModalSection
            title={"Import existing playlists"}
            onClick={handleOpenAddByExisting}
          >
            {isExistingOpen && <AddbyExisting handleFetch={handleFetch} />}
          </ModalSection>
        </Wrapper>
      )}
    </>
  );
};

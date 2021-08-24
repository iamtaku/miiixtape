import React, { useState } from "react";
import { useFetchCache } from "../../queries/hooks";
import { useGlobalContext } from "../../state/context";
import { Collection } from "../../types/types";
import { Loading, ModalSection } from "../Shared";
import { AddbyExisting } from "./AddbyExisting";
import { Confirm } from "./Confirm";

export const ImportModal = (): JSX.Element => {
  const { state } = useGlobalContext();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [data, setData] = useState<Collection>();
  const collectionCache = useFetchCache<Collection>([
    "collection",
    state.ui.currentModalId,
  ]);
  const handleFetch = (collection: Collection) => {
    setData(collection);
    setIsConfirmOpen(true);
    console.log(collection);
  };

  const handleConfirmClose = () => {
    setIsConfirmOpen(false);
  };
  if (!collectionCache) return <Loading />;
  return data && isConfirmOpen ? (
    <Confirm
      data={collectionCache}
      handleConfirmClose={handleConfirmClose}
      to={data}
    />
  ) : (
    <ModalSection title="Select a Playlist to Import to">
      <AddbyExisting handleFetch={handleFetch} noSpotify />
    </ModalSection>
  );
};

import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { QueryClient, useQueryClient } from "react-query";
import styled from "styled-components";
import { device } from "../globalStyle";
import { usePatchPlaylistItems } from "../queries/hooks";
import { Collection, Song } from "../types/types";
import { Modal } from "./modal";
import Player from "./players";
import { Sidebar } from "./sidebar";

const LayoutWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  position: relative;
  display: grid;
  overflow: hidden;
  grid-template-rows: 1fr;
  grid-template-columns: 0.6fr 3fr;
  grid-template-areas: "sidebar inner";
`;

const InnerLayout = styled.div`
  grid-area: inner;
  overflow: hidden;
  width: 100%;
  height: 100%auto;
  background-color: var(--primary);
  position: relative;
  @media ${device.laptop} {
    grid-template-rows: 30% 70%;
  }
`;

const reorder = <T,>(list: T[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const getList = <T,>(queryClient: QueryClient, sourceId: string[]) =>
  queryClient.getQueryData<T>(sourceId);

const stripId = (id: string) => {
  // if (id.includes("tracks")) {
  return ["collection", id.replace("-tracks", "").trim()];
  // }
  // return id.replace("sidebar", "").trim();
};

export const Layout: React.FC = ({ children }) => {
  const queryClient = useQueryClient();
  const mutation = usePatchPlaylistItems();

  const handleOnDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;
    console.log(source, destination);
    // debugger;

    // we need source and destination i.e. sidebar or track
    // we need id of item that we are reordering
    // reorder the LIST that the item is included in
    // UPDATE our cache of our queryclient
    // for TRACK we need the corresponding playlist
    // for PLAYLIST we need the entire playlist

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const sourceId = stripId(source.droppableId);
      const list = getList<Collection>(queryClient, sourceId);
      if (!list) return;
      const items = reorder(list.tracks, source.index, destination.index);
      await mutation.mutate({ id: draggableId, position: destination.index });
      // .then(() => {
      queryClient.setQueryData<Collection>(sourceId, {
        ...list,
        tracks: items,
        // });
      });
      // let state = { items };
      // if (source.droppableId === "droppable2") {
      //   state = { selected: items };
      // }
      // this.setState(state);
    } else {
      // const result = move(
      //   this.getList(source.droppableId),
      //   this.getList(destination.droppableId),
      //   source,
      //   destination
      // );
      // this.setState({
      //   items: result.droppable,
      //   selected: result.droppable2,
      // });
    }

    // const sInd = +source.droppableId;
    // const dInd = +destination.droppableId;
    console.log(source.droppableId, destination.droppableId);
  };

  return (
    <LayoutWrapper>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Sidebar />
        <InnerLayout>
          <Modal />
          {children}
          <Player />
        </InnerLayout>
      </DragDropContext>
    </LayoutWrapper>
  );
};

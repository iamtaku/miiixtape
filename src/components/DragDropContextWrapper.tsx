import React from "react";
import {
  DragDropContext,
  DragStart,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";
import { QueryClient, useQueryClient } from "react-query";
import { reorderList } from "../helpers/utils";
import {
  usePatchPlaylist,
  usePatchPlaylistItems,
  usePostPlaylistItems,
} from "../queries/hooks";
import { useGlobalContext } from "../state/context";
import { Collection, Song } from "../types/types";

const getList = <T,>(queryClient: QueryClient, sourceId: QueryKey) =>
  queryClient.getQueryData<T>(sourceId);

type QueryType = "collection" | "song";

type QueryKey = [QueryType, string] | string;

const queryKeyGen = (queryType: QueryType, id: string): QueryKey => {
  if (queryType === "collection" && id.includes("tracks")) {
    return [queryType, id.replace("-tracks", "").trim()];
  }
  if (queryType === "collection" && id.includes("sidebar")) {
    return [queryType, id.replace("-sidebar", "").trim()];
  }
  return [queryType, id];
};

export const DragDropContextWrapper: React.FC = ({ children }) => {
  const queryClient = useQueryClient();
  const patchPlaylistItemsMutation = usePatchPlaylistItems();
  const patchPlaylistMutation = usePatchPlaylist();
  const postMutation = usePostPlaylistItems();
  const { dispatch, state } = useGlobalContext();

  const handleOnDragStart = (
    initial: DragStart,
    _provided: ResponderProvided
  ) => {
    if (state.ui.disabledSection) return;
    if (initial.source.droppableId === "sidebar") {
      dispatch({ type: "DISABLE_DROP", payload: { section: "TRACKS" } });
    }
  };

  const handleOnDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId, combine } = result;
    dispatch({ type: "RESET_DROP", payload: {} });

    if (combine) {
      const song = queryClient.getQueryData<Song>([
        "song",
        result.draggableId.split("/")[1],
      ]);
      if (!song) return;
      postMutation.mutate({
        id: combine.draggableId.split("/sidebar")[0],
        tracks: [song],
      });
    }

    if (!destination) {
      return;
    }

    if (
      source.index === destination.index ||
      source.droppableId !== destination.droppableId
    ) {
      return;
    }

    if (destination.droppableId.includes("tracks")) {
      const queryKey = queryKeyGen("collection", source.droppableId);
      const list = getList<Collection>(queryClient, queryKey);
      if (!list) return;

      console.log(source.index, destination.index);
      const items = reorderList(list.tracks, source.index, destination.index);
      queryClient.setQueryData<Collection>(queryKey, {
        ...list,
        tracks: items,
      });
      patchPlaylistItemsMutation.mutate({
        id: draggableId.split("/")[0],
        position: destination.index,
        // updatedTracks: items,
      });
    }

    if (destination.droppableId.includes("sidebar")) {
      const list = getList<Collection[]>(queryClient, "playlistAll");
      if (!list) return;
      // eslint-disable-next-line no-debugger
      console.log(source.index, destination.index);
      const items = reorderList(list, source.index, destination.index);
      queryClient.setQueryData("playlistAll", items);
      patchPlaylistMutation.mutate({
        id: draggableId.split("/")[0],
        position: destination.index,
      });
    }
  };

  return (
    <DragDropContext
      onDragEnd={handleOnDragEnd}
      onDragStart={handleOnDragStart}
    >
      {children}
    </DragDropContext>
  );
};

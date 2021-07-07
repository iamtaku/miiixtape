import { rest } from "msw";
import * as React from "react";
import { renderHook } from "@testing-library/react-hooks";
import { server } from "../../setupTests";
import { createWrapper } from "./utils";
import {
  useGetAllPlaylists,
  useGetUser,
  usePostPlaylist,
  usePostPlaylistItems,
} from "../../queries/hooks";
import { useQuery } from "react-query";
import axios from "axios";
import { act, create } from "react-test-renderer";
import { mockTracks } from "./db";

describe("useGetUser hook", () => {
  test("successful query hook", async () => {
    const { result, waitFor } = renderHook(() => useGetUser(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => result.current.isSuccess);
    expect(result.current.data?.username).toBe("mocked-username");
  });

  test("failure query hook", async () => {
    server.use(
      rest.get("*", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    const { result, waitFor } = renderHook(() => useGetUser(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => result.current.isError);

    expect(result.current.error).toBeDefined();
  });
});

const fetchText = async (): Promise<{ working: string }> =>
  axios.get("https://whatever.com/test").then((res) => res.data);

const useFetchText = () => {
  return useQuery<{ working: string }>("test", fetchText);
};

describe("test", () => {
  test("testing whether server is working", async () => {
    const { result, waitFor } = renderHook(() => useFetchText(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data?.working).toBe("yes");
  });
});

describe("useGetPlaylistshook", () => {
  test("successful getplaylist hook", async () => {
    const { result, waitFor } = renderHook(() => useGetAllPlaylists(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => result.current.isSuccess);
    //@ts-ignore
    expect(result.current.data[0].playlistInfo.name).toBe("mockitem1");
    expect(result.current.data?.length).toEqual(2);
  });
});

describe("usePostPlaylisthook", () => {
  it("succesfully creates a playlist", async () => {
    const { result, waitFor } = renderHook(() => usePostPlaylist(), {
      wrapper: createWrapper(),
    });
    const testPlaylist = "mockPlaylist1";

    act(() => {
      result.current.mutate(testPlaylist);
    });

    await waitFor(() => result.current.isSuccess);
    expect(result.current.status).toBe("success");
    expect(result.current.data?.data.attributes.name).toBe(testPlaylist);
  });
});

describe("usePostPlaylistItemHook", () => {
  it("succesfully creates multiple playlistItems", async () => {
    const { result, waitFor } = renderHook(() => usePostPlaylistItems(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({ id: "mockplaylist1", tracks: mockTracks });
    });

    await waitFor(() => result.current.isSuccess);
    expect(result.current.status).toBe("success");
    expect(
      result.current.data?.data.relationships.playlist_items.data
    ).toHaveLength(3);
    expect(
      result.current.data?.data.relationships.playlist_items.data[0]
    ).toEqual(mockTracks[0]);
  });
});

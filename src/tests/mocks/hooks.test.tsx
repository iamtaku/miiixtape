import { rest } from "msw";
import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-test-renderer";
import { server } from "../../setupTests";
import { createWrapper } from "./utils";
import {
  useDeletePlaylist,
  useGetAllPlaylists,
  useGetUser,
  usePostPlaylist,
  usePostPlaylistItems,
} from "../../queries/hooks";
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

describe("useGetPlaylistshook", () => {
  test("successful getplaylist hook", async () => {
    const { result, waitFor } = renderHook(() => useGetAllPlaylists(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => result.current.isSuccess);
    // expect(result.current.data[0]).toBe("mockitem1");
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
    expect(result.current.data?.playlistInfo.name).toBe(testPlaylist);
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
    expect(result.current.data?.tracks.length).toHaveLength(3);
    expect(result.current.data?.tracks[0]).toEqual(mockTracks[0]);
  });
});

describe("useDeletePlaylistItemHook", () => {
  it("deletes a playlist", async () => {
    const { result, waitFor } = renderHook(() => useDeletePlaylist(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate();
    });

    await waitFor(() => result.current.isSuccess);
    expect(result.current.status).toBe("success");
  });
});

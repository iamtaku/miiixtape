import { rest } from "msw";
import * as React from "react";
import { renderHook } from "@testing-library/react-hooks";
import { server } from "../../setupTests";
import { createWrapper } from "./utils";
import { useGetUser } from "../../queries/hooks";
import { useQuery } from "react-query";
import axios from "axios";
import { create } from "react-test-renderer";

describe("useGetUser hook", () => {
  test("successful query hook", async () => {
    const { result, waitFor } = renderHook(() => useGetUser(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => result.current.isSuccess);
    console.log(result.current.data);
    expect(result.current.data?.username).toBe("mocked-username");
  });

  //   test("failure query hook", async () => {
  //     server.use(
  //       rest.get("*", (req, res, ctx) => {
  //         return res(ctx.status(500));
  //       })
  //     );

  //     const { result, waitFor } = renderHook(() => useGetUser(), {
  //       wrapper: createWrapper(),
  //     });

  //     await waitFor(() => result.current.isError);

  //     expect(result.current.error).toBeDefined();
  //   });
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

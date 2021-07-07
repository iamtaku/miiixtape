import "@testing-library/jest-dom";
import { setupServer } from "msw/node";
import { handlers } from "./tests/mocks/utils";
import { setLogger } from "react-query";
require("jest-localstorage-mock");

export const server = setupServer(...handlers);

beforeEach(() => {
  // to fully reset the state between tests, clear the storage
  localStorage.clear();
  // and reset all mocks
  jest.clearAllMocks();
  localStorage.setItem("token", "testToken");
});
// Establish API mocking before all tests.
beforeAll(() => {
  server.listen();
});
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());

// silence react-query errors
setLogger({
  log: console.log,
  warn: console.warn,
  error: () => {},
});

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

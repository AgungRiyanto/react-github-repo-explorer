// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
jest.mock("@octokit/core", () => ({
  Octokit: jest.fn().mockImplementation(() => ({
    request: jest.fn(),
  })),
}));

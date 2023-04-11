import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { BrowserRouter } from "react-router-dom";
import moment from "moment";

let posts = [
  {
    _id: 1,
    word: "Nuke",
    title: "Fake post regarding Nuke",
    ups: 100,
    upvote_ratio: 0.75,
    thumbnail: "www.google.com",
    subreddit: "news",
    created: moment().unix(),
  },
];

const server = setupServer(
  rest.get("http://localhost:8080/posts", (req, res, ctx) => {
    return res(ctx.json({ posts }));
  }),
  rest.get("/api/posts", (req, res, ctx) => {
    return res(ctx.json({ posts }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
describe("Integration test suite", () => {
  test("renders app", () => {
    render(<App />);
    const linkElement = screen.getByText(/ Mass Destruction/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("Renders posts successfully in app", async () => {
    render(<App />);

    await waitFor(() => {
      let tempText = screen.getByText(/Fake post regarding Nuke/i);
      expect(tempText).toBeInTheDocument();

      let text = screen.getByText(/Ups: /i);
      expect(text).toBeInTheDocument();
    });
  });

  test("Renders posts in last 4 hours correctly", async () => {
    render(<App />);

    await waitFor(() => {
      const text = screen.getByText(
        /Posts in last 4 hours including weapons of mass destruction: 1/i
      );

      expect(text).toBeInTheDocument();
    });
  });

  test("Renders select bar", async () => {
    render(<App />);

    await waitFor(() => {
      const text = screen.getByText(/Current word: None/i);
      expect(text).toBeInTheDocument();
    });
  });

  test("Renders NavBar", async () => {
    render(<App />);

    await waitFor(() => {
      const text = screen.getByTestId("signInButton");
      expect(text).toBeInTheDocument();
    });
  });

  test("Only renders folders for keywords that exist in posts", async () => {
    render(<App />);

    await waitFor(() => {
      const text = screen.queryByText(/ICBM/i);
      expect(text).not.toBeInTheDocument();

      const text2 = screen.queryAllByText(/Nuke/i);
      expect(text2[0]).toBeInTheDocument();
    });
  });
});

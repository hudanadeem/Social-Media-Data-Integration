export default function getAPIBaseUrl() {
  let apiUrl = "";

  if (!process.env.REACT_APP_SERVER_BASE && !process.env.REACT_APP_SERVER_PORT) {
    apiUrl = "http://localhost:8080"; // This is for local dev purposes but we should never do this
  } else {
    apiUrl = `/api`; // will resolve to target in setupProxy.js
  }

  return apiUrl;
}

export async function getPosts() {
  let posts = [];
  const BASE_URL = getAPIBaseUrl();

  try {
    console.log("SENDING GET REQUEST to fetch tasks");

    // TODO: Use axios instead of fetch
    const res = await fetch(`${BASE_URL}/posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (data.posts) {
      posts = data.posts;
    }
  } catch (e) {
    console.error("Unable to fetch tasks");
    console.error(e);
  }

  return posts;
}

export async function getHealth() {
  const BASE_URL = getAPIBaseUrl();

  let health = "Checking Health...";

  try {
    console.log("SENDING GET REQUEST to get health status");

    const res = await fetch(`${BASE_URL}/health`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (data.health) {
      health = data.health;
    } else {
      health = "Not Healthy";
    }
  } catch (e) {
    console.error("Unable to fetch server health");
    console.error(e);
    health = "Not Healthy";
  }

  return health;
}

export default function getAPIBaseUrl() {
  let apiUrl = "";

  console.log(
    `REACT_APP_SERVER_BASE: ${process.env.REACT_APP_SERVER_BASE} + REACT_APP_SERVER_PORT: ${process.env.REACT_APP_SERVER_PORT}`
  );

  if (
    !process.env.REACT_APP_SERVER_BASE &&
    !process.env.REACT_APP_SERVER_PORT
  ) {
    apiUrl = "http://localhost:8080";
  } else {
    apiUrl = `${process.env.REACT_APP_SERVER_BASE}:${process.env.REACT_APP_SERVER_PORT}`;
  }

  return apiUrl;
}

export async function getTasks() {
  let tasks = [];
  const BASE_URL = getAPIBaseUrl();

  try {
    const res = await fetch(`${BASE_URL}/tasks`);
    const data = await res.json();

    if (data.tasks) {
      tasks = data.tasks;
    }
  } catch (e) {
    console.error("Unable to fetch tasks");
    console.error(e);
  }

  return tasks;
}

export function postNewTasks(text) {
  const BASE_URL = getAPIBaseUrl();

  return fetch(`${BASE_URL}/task`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
}

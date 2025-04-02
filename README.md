# 💥 Mass Destruction Monitor

A full-stack web app that scrapes and visualizes online content mentioning terms related to **mass destruction**, such as "nuclear weapon", "biological warfare", "chemical weapon", etc. 

This app aggregates posts from **Reddit** and **NewsAPI**, stores them in **MongoDB**, and displays them via a React frontend. Built collaboratively by a team of 3 developers.

---

## 🧠 What It Does

- Collects real-time posts/articles containing keywords like:
- Sources:
- 🔗 [Reddit](https://www.reddit.com)
- 📰 [NewsAPI](https://newsapi.org)
- Stores and categorizes data in MongoDB.
- Displays the results on a modern frontend UI.
- Fully containerized using **Docker Compose** (frontend, backend, database).

---

## 🛠️ Tech Stack
<table>
  <tr>
    <th>Technology</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" width="30"/> <b>React.js</b></td>
    <td>Frontend JavaScript library for building user interfaces.</td>
  </tr>
  <tr>
    <td><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" width="30"/> <b>Node.js</b></td>
    <td>JavaScript runtime for building scalable network applications.</td>
  </tr>
  <tr>
    <td><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg" width="30"/> <b>Express</b></td>
    <td>Minimal and flexible Node.js web application framework.</td>
  </tr>
  <tr>
    <td><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg" width="30"/> <b>MongoDB</b></td>
    <td>NoSQL database for storing and managing data. (with Mongoose ODM)</td>
  </tr>
  <tr>
    <td><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg" width="30"/> <b>Docker</b></td>
    <td>Platform for developing, shipping, and running applications in containers.</td>
  </tr>
  <tr>
    <td><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg" width="30"/> <b>Docker Compose</b></td>
    <td>Tool for defining and running multi-container Docker applications.</td>
  </tr>
  <tr>
    <td> <b>Reddit API</b></td>
    <td>Public JSON API for accessing Reddit data.</td>
  </tr>
  <tr>
    <td><img src="https://newsapi.org/favicon.ico" width="30"/> <b>NewsAPI.org</b></td>
    <td>API for fetching news articles from various sources.</td>
  </tr>
</table>



---

## 🚀 Getting Started

### 📦 Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed
- Git installed

---

### 🧪 Running the App

1. Clone the repo:
```bash
git clone https://github.com/hudanadeem/mass-destruction-monitor.git
cd mass-destruction-monitor
```
# Three Container App with Docker Compose

_this example was created by Anas shahwan and [originally posted on medium.com](https://medium.com/@Anas.shahwan/dockerizing-nodejs-react-js-and-mongodb-apps-be67a73c7a7b)_

## To Run

1. Ensure that you have docker installed
2. Clone repo
3. CD to repo and type `docker compose build --no-cache`
4. Wait for it to complete building successfully
5. Type `docker compose up`
6. Wait for it to start the backend server and frontend server
7. You'll see something like

```
 You can now view task_management in the browser.

          Local:            http://localhost:3000
          On Your Network:  http://172.28.0.4:3000
```

1. Point your web browser at localhost:3000
1. In another terminal `docker compose down` will shut everything down

## To develop/change/code

1. Ensure you have the Dev Containers and Remote SSH extension installed in VS Code and Docker Desktop running in the background
1. Open the repository folder in Visual Studio Code
1. Lower left corner click on the arrows and choose `Reopen in Container`
<!-- 1. choose from docker-compose.yaml
1. choose which service you want to work on (frontend, backend or mongo) -->
1. It should start up the mongo container the backend container and the frontend container.
1. The new VS Code window should open the frontend folder to make code changes. Any changes made inside the container should save it locally as well.
1. Wait for VS Code to build and start the containers.
1. I still have to figure out how to open the backend portion of the containers and develop it individually so stay tuned for that.

## Troubleshooting common issues:

When you pull the repository for the first time, the docker compose and build commands should definitely work. However, for subsequent builds if you face any issues, you can do the following:

1. From Docker Desktop, go under the Containers tab and delete the three_container_stack
2. Next go under Images tab, and delete the three_container_stack-frontend and three_container_stack-backend
3. Next go under the Volumes tab and delete **all** the volumes, especially the three_container_stack_data.
4. Go to VSCode where the project is and in the terminal run `docker compose build --no-cache`
5. Next `docker compose up`

If you face the issue:

> react-scripts not found

you may have modified the Dockerfile in the frontend folder. I know why this is happening - we have to set the path of the node_modules/.bin/ as our PATH inside the container. I haven't done that yet because I wanted to keep the Dockerfile simple for y'all but I will be adding this for a more stable build for Kubernetes.

Another issue is hot-reloading inside the docker container for the react application is not working. This is bug in react-scripts-v5 which is still open. I am looking into solutions for this. I have test some containers to see if it is safe to downgrade to v4 instead. So stay tuned for that

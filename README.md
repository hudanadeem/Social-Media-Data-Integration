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

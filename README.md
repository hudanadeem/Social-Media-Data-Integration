# Three Container App with Docker Compose

*this example was created by Anas shahwan and [originally posted on medium.com](https://medium.com/@Anas.shahwan/dockerizing-nodejs-react-js-and-mongodb-apps-be67a73c7a7b)*


## To Run

1. Ensure that you have docker installed
1. Clone repo
2. CD to repo and type `docker compose build`
  1. wait
1. type `docker compose up`
  1. wait 
  2. you'll see something like 
  ```
   You can now view task_management in the browser.

            Local:            http://localhost:3000
            On Your Network:  http://172.28.0.4:3000
```
1. point your web browser at localhost:3000
1. `docker compose down` will shut everything down


## To develop/change/code

1. ensure you have the docker container extension installed in vs code
1. open the repository folder in visual studio code
1. lower left corner click on the arrows and choose `reopen in container`
1. choose from docker-compose.yaml
1. choose which service you want to work on (frontend, backend or mongo)
   1. wait for vs code to build and start the containers

   **this list not finished**


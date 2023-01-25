# Docker has excellent documentation which can be found at: https://docs.docker.com/engine/reference/builder/
# The documentation below was inspired from the official docker docs

# A Dockerfile must begin with a FROM clause. There are pre-built images in the Docker Hub registry. 
# Since we are building a Node application we are pulling the node image from docker hub 
# The 18-slim after the colon is the version of node we want to pull. We are currently using the latest node lts (long term support) 
# Specifying the version is very important for stable builds. This version of node is also compatible with react-scripts v5 but not compatible with react-scripts v4
# We want our images to be small in size hence we are using the 18-slim version which is a debian distro
FROM node:18-slim

# The ARG stanza defines a variable that users can pass at build-time
ARG PORT=8080

# ENV works very similar to ARG. They are use to set environment variables inside the image
# Difference is ENV is always persisted in the built image but ARG is not
# In the ENV command below, we are saving the environment variable PORT with the value 8080
# We could have set the ENV directly to 8080 but sometimes ARGS are helpful when we need to use the VARIABLES set by ARG elsewhere
ENV PORT $PORT

# The RUN stanza runs the commands mentioned while building the image
# It is recommended to get the latest version of npm to get the latest security fixes
RUN npm i npm@latest -g

# WORKDIR creates the directory and changes the current working directory to the created directory
WORKDIR /app/backend

# We will copy the package.json and package-lock.json into the current working directory as they define the depedencies our application needs
# They are the files with the least changes hence we need to copy them first
COPY package.json package-lock.json ./

# RUN the npm install command once you copy the package.json and package-lock.json
# I will change this in the future because this creates unstable builds (I found some while testing)
# There is a better way to do this and I will do it once we move to Kubernetes
RUN npm install

# We copy the source code from the host machine to the current working directory 
# of the image at the end because we change the source code frequently
COPY . .

# Last we expose the PORT 8080.
# The EXPOSE STANZA informs Docker that the container listens on the specified network ports at runtime.
EXPOSE $PORT

# CMD runs when you want to run a container from an image. This can be overridden in the docker compose file
CMD ["npm","start"]

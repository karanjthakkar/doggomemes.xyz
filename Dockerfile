FROM geekykaran/headless-chrome-node-docker:latest

RUN mkdir /app

WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn install --production --pure-lockfile

COPY . /app/

# Expose port and host of the docker container to outside
EXPOSE 8111
ENV HOST 0.0.0.0

#runs this command when the container is created
CMD ["yarn", "server:prod"]

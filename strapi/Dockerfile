# development
FROM node:20.9.0 AS dev

RUN apt-get update && apt-get install -y git \
    vim \
    libvips-dev

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /home/node/app
COPY package*.json ./
COPY yarn.lock ./
COPY src/plugins/navikronos/package.json ./src/plugins/navikronos/package.json
COPY src/plugins/navikronos/yarn.lock ./src/plugins/navikronos/yarn.lock

RUN yarn install
COPY . ./

RUN yarn build

EXPOSE 1337
CMD ["yarn", "develop"]

# production
FROM node:20.9.0 AS prod

RUN apt-get update && apt-get install -y git \
    libvips-dev

USER node

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app
WORKDIR /home/node/app

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
# ENV PATH /home/node/node_modules/.bin:$PATH

COPY --chown=node:node package*.json ./
COPY --chown=node:node yarn.lock ./
COPY --chown=node:node src/plugins/navikronos/package.json ./src/plugins/navikronos/package.json
COPY --chown=node:node src/plugins/navikronos/yarn.lock ./src/plugins/navikronos/yarn.lock

RUN yarn config set network-timeout 600000 -g
RUN yarn install --production

COPY --chown=node:node . ./

RUN yarn build

EXPOSE 1337
CMD ["yarn", "start"]

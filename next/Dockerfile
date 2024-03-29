FROM node:18.17 as build

ENV PORT 3000

WORKDIR /root/app

COPY package*.json /root/app
COPY yarn.lock /root/app

RUN yarn config set network-timeout 600000 -g
RUN yarn install

COPY . ./

RUN yarn build


FROM node:18.17 as dev

RUN mkdir -p /root/app
ENV PORT 3000

WORKDIR /root/app

COPY package*.json /root/app
COPY yarn.lock /root/app

RUN yarn config set network-timeout 600000 -g
RUN yarn install

COPY . ./

RUN yarn build

EXPOSE 3000
CMD [ "yarn", "develop" ]

FROM node:18.17-alpine as prod

USER node
ENV PORT 3000

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node yarn.lock ./

RUN yarn config set network-timeout 600000 -g
RUN yarn install --production

COPY --chown=node:node . ./
COPY --chown=node:node --from=build /root/app/.next ./.next

EXPOSE 3000
CMD [ "yarn", "start" ]

FROM node:20.19-alpine AS base

FROM base AS install
RUN apk update \
 && apk add --no-cache build-base \
                       gcc \
                       autoconf \
                       automake \
                       zlib-dev \
                       libpng-dev \
                       vips-dev
WORKDIR /build
COPY ./package.json ./package-lock.json ./
# Uncomment if you need any to apply any patches
# COPY patches ./patches
# copy any installation files for Strapi plugins you want to build. For example:
# COPY src/plugins/<package-name>/package.json src/plugins/<package-name>/package-lock.json ./src/plugins/<package-name>/
# Or leave empty (do not add anything) if you don't have any custom plugins (most likely ./plugins directory)
COPY src/plugins/navikronos/package.json src/plugins/navikronos/package-lock.json ./src/plugins/navikronos/

ENV NPM_CONFIG_CACHE=/build/.cache/npm
RUN --mount=type=cache,target=/build/.cache/npm \
    npm clean-install --include=dev

FROM install AS build
COPY --chown=node:node ./ .
RUN --mount=type=cache,target=/build/.cache/npm \
    npm run build \
 && npm prune --production

FROM base AS app-base
RUN apk add --no-cache vips-dev \
    tini
RUN mkdir -p /home/node/app \
    && chown node:node /home/node/app
USER node
WORKDIR /home/node/app
# Adds Strapi cli to the PATH
ENV PATH=/home/node/app/node_modules/.bin:$PATH
ENV NODE_ENV=production
EXPOSE 1337
ARG GIT_COMMIT="undefined"
ENV GIT_COMMIT=$GIT_COMMIT
LABEL org.opencontainers.image.revision="${GIT_COMMIT}" \
      org.opencontainers.image.source="https://github.com/bratislava/mestskakniznica.sk" \
      org.opencontainers.image.licenses="EUPL-1.2"
ENTRYPOINT [ "/sbin/tini", "--" ]

FROM app-base AS dev
ENV NODE_ENV=development
COPY --chown=node:node --from=install /build/node_modules ./node_modules
CMD [ "npm", "run", "develop" ]

FROM app-base AS prod
COPY --chown=node:node --from=build /build/favicon.ico /build/package.json /build/package-lock.json /build/tsconfig.json ./
COPY --chown=node:node --from=build /build/node_modules ./node_modules
COPY --chown=node:node --from=build /build/config ./config
COPY --chown=node:node --from=build /build/public ./public
COPY --chown=node:node --from=build /build/dist ./dist
# COPY to final image any built Strapi plugins. In this stage you will *ONLY* need
# - plugins/<name>/package-lock.json
# - plugins/<name>/package.json
# - plugins/<name>/dist/
# - plugins/<name>/*.js
# Or leave empty (do not add anything) if you don't have any custom plugins (most likely ./plugins directory)
# Plugin navikronos
COPY --chown=node:node --from=install /build/src/plugins/navikronos/package.json /build/src/plugins/navikronos/package-lock.json ./src/plugins/navikronos/
# COPY dynamically link dependency for navikronos plugin
COPY --chown=node:node --from=build /build/src/plugins/navikronos/node_modules/zod /build/src/plugins/navikronos/package-lock.json ./src/plugins/navikronos/node_modules/zod/
COPY --chown=node:node --from=build /build/src/plugins/navikronos/dist ./src/plugins/navikronos/dist
COPY --chown=node:node --from=build /build/src/plugins/navikronos/*.js ./src/plugins/navikronos/
CMD [ "strapi", "start" ]

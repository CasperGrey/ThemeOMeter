FROM node:slim

RUN mkdir /app
WORKDIR /app

COPY package.json /app/package.json
RUN npm install && \
    npm i webpack-dev-server webpack -g

COPY . /app/

RUN npm install
RUN npm build

EXPOSE 5000
EXPOSE 8000

ENTRYPOINT ["npm"]
CMD ["start"]

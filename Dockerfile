FROM node:8

RUN mkdir /app
COPY package.json /app/
COPY *.js /app/

WORKDIR /app
RUN npm install

CMD ["npm", "start"]

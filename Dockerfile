FROM alpine
RUN apk add npm
COPY . /srv
WORKDIR /srv
RUN npm install
CMD npm start

FROM alpine
RUN apk add npm
COPY . /srv
WORKDIR /srv
RUN npm install && \
        npm run build
CMD PORT=$PORT npm start

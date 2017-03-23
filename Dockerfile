FROM node

RUN npm install -g http-server
WORKDIR /usr/apps/webroot

CMD ["http-server"]


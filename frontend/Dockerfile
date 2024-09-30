FROM node:alpine

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm config set strict-ssl=false
RUN npm install -g @angular/cli
RUN npm install

EXPOSE 4300

CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4300"]


# Stage 1: build
FROM node:16.15.0 AS development

WORKDIR /uzwal/frontend/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g @angular/cli@14.0.1

COPY . .

RUN npm run build

EXPOSE 4200
FROM node:alpine as builder
WORKDIR /app
COPY . /app/
RUN npm i
RUN npm run build

FROM nginx:mainline-alpine3.18-slim
COPY --from=builder /app/dist /usr/share/nginx/html

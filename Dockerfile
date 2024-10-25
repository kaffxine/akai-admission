# transpile typescript
FROM node:current-alpine AS build
WORKDIR /build
COPY tsconfig.json index.ts ./
RUN npm install -g typescript
RUN tsc index.ts

# host on port 8080
FROM nginx:alpine
ENV NGINX_DIR=/usr/share/nginx/html
RUN rm -rf ${NGINX_DIR}/*
COPY --from=build /build/index.js ${NGINX_DIR}/
COPY index.html index.css ${NGINX_DIR}/
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]

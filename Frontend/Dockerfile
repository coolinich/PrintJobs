FROM node:14 AS print-jobs-build
WORKDIR /usr/src/frontend
COPY . .
RUN npm ci && npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=print-jobs-build  /usr/src/frontend/dist/print-jobs-app /usr/share/nginx/html
EXPOSE 80
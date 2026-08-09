FROM nginx:1.27-alpine
COPY ops/nginx.conf /etc/nginx/conf.d/default.conf
COPY site/ /usr/share/nginx/html/
EXPOSE 3000

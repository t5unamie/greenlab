README.MD

run from git root.

docker run --name front-end -it -p 8080:80 -v /Users/jphan/Desktop/docs/code/Greenlabs/02-frontend/01-MAIN:/usr/share/nginx/html -v /Users/jphan/Desktop/docs/code/Greenlabs/03-Docker/nginx/default.conf:/etc/nginx/conf.d/default.conf nginx

all: build runServer

build: stylecow webpack
	cd ./public/handlebars; ./precompile.sh

runServer:
	cd server; go run front_server.go &

stopServer:
	pkill front_server

main:
	google-chrome http://127.0.0.1:8080

stylecow:
	stylecow

webpack:
	webpack

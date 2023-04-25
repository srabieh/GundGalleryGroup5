# Gund Gallery Immersive Experience
# Makefile

all: start

install_deps:
	npm install

start:
	export PORT=5000 JWT_SECRET=RICKYBOBBY && node server.js

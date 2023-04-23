# Gund Gallery Immersive Experience
# Makefile

all: install_deps start

install_deps:
	npm install

start:
	export PORT=5000 && node server.js

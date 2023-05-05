# # Gund Gallery Immersive Experience
# # Makefile

all: install_deps start

install_deps:
	npm install

start:
	node server.js

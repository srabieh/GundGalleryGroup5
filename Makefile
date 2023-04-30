# Gund Gallery Immersive Experience
# Makefile

# Change for your system
DB_USERNAME='root'
DB_PASSWORD='newpassword'

all: start

install_deps:
	npm install

start:
	export DB_USER=$(DB_USERNAME) DB_PASSWORD=$(DB_PASSWORD) PORT=5000 JWT_SECRET=RICKYBOBBY && node server.js

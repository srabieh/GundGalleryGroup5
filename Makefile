# # Gund Gallery Immersive Experience
# # Makefile

#Change these for your system
DB_USERNAME='root'
DB_PASSWORD='newpassword'

all: install_deps start

install_deps:
	npm install

start:
<<<<<<< HEAD
	export DB_USERNAME=$(DB_USERNAME) DB_PASSWORD=$(DB_PASSWORD) PORT=5000 JWT_SECRET=RICKYBOBBY && node server.js
=======
	export DB_USERNAME=$(DB_USERNAME) DB_PASSWORD=$(DB_PASSWORD) PORT=5000 JWT_SECRET=RICKYBOBBY && node server.js
>>>>>>> main

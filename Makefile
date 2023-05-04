# # Gund Gallery Immersive Experience
# # Makefile

#Change these for your system
DB_USERNAME='root'
DB_PASSWORD='GrantCulbertson'
HOST = '18.116.8.156'

all: install_deps start

install_deps:
	npm install

start:
	export DB_USERNAME=$(DB_USERNAME) DB_PASSWORD=$(DB_PASSWORD) PORT=5000 JWT_SECRET=RICKYBOBBY && node server.js

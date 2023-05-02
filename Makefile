# Gund Gallery Immersive Experience
# Makefile

# Change for your system
DB_USERNAME='root'
DB_PASSWORD='GrantCulbertson'

# where it wil all go on the website
GUND_DIR= /var/www/html/gund

all: start PutWeb

install_deps:
	npm install

# does not have mkdir -p $(GUND_DIR), expects user to mkdir and chown themselves
PutWeb:
	cp -r views/. $(GUND_DIR)
	
	echo "Current contents of your HTML directory: "
	ls -l /var/www/html/gund/

start:
	export DB_USERNAME=$(DB_USERNAME) DB_PASSWORD=$(DB_PASSWORD) PORT=5000 JWT_SECRET=RICKYBOBBY && node server.js

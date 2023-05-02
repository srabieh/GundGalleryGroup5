# Gund Gallery Immersive Experience
# Makefile

# Change for your system
DB_USERNAME='root'
DB_PASSWORD='GrantCulbertson'

all: start move_client_side_files build_server PutWeb

# where it wil all go on the website
GUND_DIR= /var/www/html/gund



install_deps:
	npm install 

move_client_side_files:
	-mkdir -p $(GUND_DIR)
	cp views/*.ejs /var/www/html/GundGalleryGroup5/
	cp views/css/*.css /var/www/html/GundGalleryGroup5/css/
	cp views/js/*.js /var/www/html/GundGalleryGroup5/js/

build_server:
	npm run build

echo_contents:
	echo "Current contents of your Gund Gallery directory: "
	ls -l $(GUND_DIR)

# does not have mkdir -p $(GUND_DIR), expects user to mkdir and chown themselves
PutWeb:
	cp -r views/. $(GUND_DIR)
	
	echo "Current contents of your HTML directory: "
	ls -l /var/www/html/gund/

start:
	export DB_USERNAME=$(DB_USERNAME) DB_PASSWORD=$(DB_PASSWORD) PORT=5000 JWT_SECRET=RICKYBOBBY && node server.js

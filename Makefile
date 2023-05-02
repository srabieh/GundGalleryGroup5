# Gund Gallery Immersive Experience
# Makefile

# Change for your system
DB_USERNAME='root'
DB_PASSWORD='GrantCulbertson'

all: start move_client_side_files build_server

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

start:
	export DB_USERNAME=$(DB_USERNAME) DB_PASSWORD=$(DB_PASSWORD) PORT=5000 JWT_SECRET=RICKYBOBBY && node server.js

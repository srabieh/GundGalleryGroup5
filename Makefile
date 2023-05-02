# # Gund Gallery Immersive Experience
# # Makefile

#Change these for your system
DB_USERNAME='root'
DB_PASSWORD='GrantCulbertson'

#Files will go to gund directory
GUND_DIR = /var/www/html/gund

all: install_deps move_client_side_files start

install_deps:
	npm install

move_client_side_files:
	-mkdir -p $(GUND_DIR)
	cp views/*.ejs /var/www/html/gund/
	cp views/*.txt /var/www/html/gund/
	cp views/css/*.css /var/www/html/gund/css/
	cp views/js/*.js /var/www/html/gund/js/
	cp views/images/*.png /var/www/html/gund/images/



echo_contents:
	echo "Current contents of your Gund Gallery directory: "
	ls -l $(GUND_DIR)
	
start:
	export DB_USERNAME=$(DB_USERNAME) DB_PASSWORD=$(DB_PASSWORD) PORT=5000 JWT_SECRET=RICKYBOBBY && node server.js
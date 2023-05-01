# Gund Gallery Immersive Experience
# Makefile

GUND_DIR = /var/www/html/gund
CLIENT_SIDE_FILES = views/adminPanel.ejs views/css/style.css views/error.ejs views/installation.ejs views/js/survey.js views/js/wordCloud.js views/survey.ejs views/wordCloud.ejs

all: install_deps move_client_side_files build_server
all: install_deps start

install_deps:
	npm install

move_client_side_files:
	-mkdir -p $(GUND_DIR)
	cp views/*.ejs /var/www/html/gund/
	cp views/css/*.css /var/www/html/gund/css/
	cp views/js/*.js /var/www/html/gund/js/

build_server:
	npm run build

echo_contents:
	echo "Current contents of your Gund Gallery directory: "
	ls -l $(GUND_DIR)
start:
	export PORT=5000 && node server.js

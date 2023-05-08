// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const installationController = require('../controllers/installationController');
const multer  = require('multer')

const upload = multer({ dest: __dirname + '/../public/images/' });

router.post("/", upload.single('image'), installationController.create);
router.post("/delete", installationController.delete);

router.get('/:id', installationController.get);
router.get('/:id/getResponses' , installationController.getResponses)


module.exports = router;

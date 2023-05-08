// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const installationController = require('../controllers/installationController');
const multer  = require('multer')

const upload = multer({ dest: 'public/images/' });


router.post("/", upload.single('image'), installationController.create);
router.post("/delete", installationController.delete);

//Getting
router.get('/:id', installationController.get);
router.get('/:id/getResponses' , installationController.getResponses)


//Posting
router.post('/threewords' , installationController.pushWords)

module.exports = router;

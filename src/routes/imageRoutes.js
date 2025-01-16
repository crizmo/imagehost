const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');

// Define routes
router.post('/upload', imageController.uploadImage);
router.get('/:filename', imageController.getImage);
router.get('/', imageController.listImages);
router.delete('/:filename', imageController.deleteImage);

module.exports = router;
const express = require('express');
const router = express.Router();
const ImageDetailController = require('../controllers/ImageDetailController');

router.post('/create', ImageDetailController.createImageDetail);
router.delete('/:productId/:imageDetailId', ImageDetailController.deleteImageDetail);
router.delete('/delete/:productId/delete-many', ImageDetailController.deleteManyImageDetails);

module.exports = router;

const express = require("express");
const router = express.Router();
const  ReviewController = require('../controllers/ReviewController');

router.post('/create', ReviewController.createReview);
router.get('/:orderId', ReviewController.getReviewsByOrderId); 

module.exports = router;

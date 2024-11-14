const ReviewService = require('../services/ReviewService');

const createReview = async (req, res) => {
    const { order, rating, comment } = req.body;
    try {
        if (!order || !rating || !comment) {
            return res.status(400).json({
                status: 'Error',
                message: 'Missing required fields: order, rating, comment',
            });
        }

        const reviewData = { rating, comment };

        const review = await ReviewService.createReview(order, reviewData);

        res.status(201).json({
            status: 'OK',
            message: 'Review created successfully',
            data: review,
        });
    } catch (error) {
        res.status(400).json({
            status: 'Error',
            message: error.message,
        });
    }
};

const getReviewsByOrderId = async (req, res) => {
    const { orderId } = req.params;
    console.log('forderId', req.params);
    try {
        if (!orderId) {
            return res.status(400).json({
                status: 'Error',
                message: 'Order ID is required',
            });
        }

        const reviews = await ReviewService.getReviewsByOrderId(orderId);

        if (!reviews || reviews.length === 0) {
            return res.status(404).json({
                status: 'Not Found',
                message: 'Không có kết quả tìm kiếm',
            });
        }

        res.status(200).json({
            status: 'OK',
            message: 'Reviews fetched successfully',
            data: reviews,
        });
    } catch (error) {
        res.status(400).json({
            status: 'Error',
            message: error.message,
        });
    }
};




module.exports = {
    createReview,
    getReviewsByOrderId
};

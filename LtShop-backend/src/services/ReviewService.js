const Order = require('../models/OrderProduct');
const Product = require('../models/ProductModel');
const Review = require('../models/ReviewModel'); 

const createReview = async (orderId, reviewData) => {
    try {
        const order = await Order.findById(orderId).populate('orderItems.product');

        if (!order) {
            throw new Error('Order not found');
        }

        const userId = order.user.toString();
        const productIds = order.orderItems.map(item => item.product._id.toString());

        const existingReview = await Review.findOne({ order: orderId });

        if (existingReview) {
            throw new Error('This order has already been reviewed.');
        }


        const reviews = productIds.map(productId => {
            return new Review({
                order: orderId,    
                user: userId,         
                product: productId,
                rating: reviewData.rating,
                comment: reviewData.comment,
            });
        });

        const savedReviews = await Review.insertMany(reviews);
        return savedReviews;

    } catch (error) {
        throw new Error(error.message);
    }
};

const getReviewsByOrderId = async (orderId) => {
    try {
        const reviews = await Review.find({ order: orderId });
        if (!reviews || reviews.length === 0) {
            throw new Error('No reviews found for this order.');
        }
        return reviews;
    } catch (error) {
        console.error('Error fetching reviews:', error.message);
        throw new Error(error.message);
    }
};







module.exports = {
    createReview,
    getReviewsByOrderId
};

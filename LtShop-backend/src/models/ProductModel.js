const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        type: { type: String, required: true },
        price: { type: Number, required: true },
        countInStock: { type: Number, required: true },
        rating: { type: Number},
        description: { type: String },
        discount: { type: String },
        selled: { type: Number },
        imageDetail: [ 
            {
                url: { type: String, required: true }
            }
        ]
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;

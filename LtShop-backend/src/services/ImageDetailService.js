const Product = require('../models/ProductModel')

const createImageDetail = async (productId, urlArray) => {
    if (!Array.isArray(urlArray) || urlArray.length === 0) {
        throw new Error('Danh sách URL không hợp lệ hoặc rỗng.');
    }
    try {
        const product = await Product.findById(productId);
        if (!product) {
            throw new Error('Sản phẩm không tồn tại.');
        }

        const newImageDetails = urlArray.map(url => ({ url }));
        product.imageDetail.push(...newImageDetails);
        await product.save();
        return product.imageDetail;
    } catch (error) {
        throw new Error('Có lỗi xảy ra khi thêm chi tiết hình ảnh: ' + error.message);
    }
};



const deleteImageDetail = async (productId, imageDetailId) => {
    try {
        console.log('qư')
        const product = await Product.findById(productId);
        if (!product) {
            throw new Error('Sản phẩm không tồn tại.');
        }
        const imageDetailIndex = product.imageDetail.findIndex(image => image._id.toString() === imageDetailId);
        if (imageDetailIndex === -1) {
            throw new Error('Không tìm thấy chi tiết hình ảnh để xóa');
        }
        const deletedImageDetail = product.imageDetail.splice(imageDetailIndex, 1);
        await product.save();
        return deletedImageDetail[0];
    } catch (error) {
        throw new Error('Có lỗi xảy ra khi xóa chi tiết hình ảnh:1 ' + error.message);
    }
};

const deleteManyImageDetails = async (productId, imageDetailIds) => {
    try {
        const product = await Product.findById(productId);
        if (!product) {
            throw new Error('Sản phẩm không tồn tại.');
        }

        const deletedImageDetails = [];
        for (let imageDetailId of imageDetailIds) {
            const imageDetailIndex = product.imageDetail.findIndex(image => image._id.toString() === imageDetailId);
            if (imageDetailIndex !== -1) {
                const deletedImageDetail = product.imageDetail.splice(imageDetailIndex, 1);
                deletedImageDetails.push(deletedImageDetail[0]);
            } else {
                console.log(`Không tìm thấy chi tiết hình ảnh với ID: ${imageDetailId}`);
            }
        }

        await product.save();
        return deletedImageDetails;
    } catch (error) {
        console.error('Error in deleteManyImageDetails service:', error);
        throw error;
    }
};




module.exports = {
    createImageDetail,
    deleteImageDetail,
    deleteManyImageDetails
};

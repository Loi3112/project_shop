
const ImageDetailService = require('../services/ImageDetailService');

const createImageDetail = async (req, res) => {
    const { productId, urls } = req.body;
    if (!productId) {
        return res.status(400).json({
            status: 'ERROR',
            message: 'Vui lòng cung cấp ID sản phẩm.',
        });
    }
    if (!Array.isArray(urls) || urls.length === 0) {
        return res.status(400).json({
            status: 'ERROR',
            message: 'Danh sách URL không hợp lệ hoặc rỗng.',
        });
    }
    try {
        const imageDetails = await ImageDetailService.createImageDetail(productId, urls);
        return res.status(201).json({
            status: 'OK',
            message: 'Thêm chi tiết hình ảnh thành công.',
            data: imageDetails,
        });
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: error.message,
        });
    }
};



const deleteImageDetail = async (req, res) => {
    const { productId, imageDetailId } = req.params;
    if (!productId || !imageDetailId) {
        return res.status(400).json({
            status: 'ERROR',
            message: 'Vui lòng cung cấp ID sản phẩm và ID chi tiết hình ảnh.',
        });
    }
    try {
        const deletedImageDetail = await ImageDetailService.deleteImageDetail(productId, imageDetailId);
        return res.status(200).json({
            status: 'OK',
            message: 'Chi tiết hình ảnh đã được xóa thành công.',
            data: deletedImageDetail,
        });
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: error.message,
        });
    }
};


const deleteManyImageDetails = async (req, res) => {
    const { productId } = req.params
    const { imageDetailIds } = req.body;
    console.log('qáewqe', req.body)
    console.log('qáewqe', productId)

    if (!productId || !Array.isArray(imageDetailIds) || imageDetailIds.length === 0) {
        return res.status(400).json({
            status: 'ERROR',
            message: 'Vui lòng cung cấp ID sản phẩm và danh sách ID chi tiết hình ảnh.',
        });
    }

    try {
        const deletedImageDetails = await ImageDetailService.deleteManyImageDetails(productId, imageDetailIds);
        return res.status(200).json({
            status: 'OK',
            message: 'Các chi tiết hình ảnh đã được xóa thành công.',
            data: deletedImageDetails,
        });
    } catch (error) {
        console.error('Error while deleting image details:', error);
        return res.status(500).json({
            status: 'ERROR',
            message: error.message,
        });
    }
};


module.exports = {
    createImageDetail,
    deleteImageDetail,
    deleteManyImageDetails
};

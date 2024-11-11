const ProductService = require('../services/ProductService')


const createProduct = async (req, res) => {
    try {
        const { name, type, price, countInStock, rating, description, discount, imageDetail } = req.body;

        if (!name || !type || !price || !countInStock || !discount || !imageDetail) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'The input is required'
            });
        }

        if (imageDetail && !Array.isArray(imageDetail)) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'Image details must be an array of URLs'
            });
        }

        const response = await ProductService.createProduct(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};


const updateProduct = async (req, res) => {
    try {
        const productID = req.params.id
        const data = req.body

        if (!productID) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'The productID is required'
            })
        }
        const response = await ProductService.updateProduct(productID, data)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json(
            {
                message: error
            })
    }
}




const deleteProduct = async (req, res) => {
    try {
        const productID = req.params.id

        if (!productID) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'The productID is required'
            })
        }
        const response = await ProductService.deleteProduct(productID)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json(
            {
                message: error
            })
    }
}


const getAllProduct = async (req, res) => {
    try {

        const { limit, page, sort, filter } = req.query
        const response = await ProductService.getAllProduct(Number(limit) || null, Number(page) || 0, sort, filter)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json(
            {
                message: error
            })
    }
}

const getDetailProduct = async (req, res) => {
    try {
        const productID = req.params.id

        if (!productID) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'The productID is required'
            })
        }
        const response = await ProductService.getDetailProduct(productID)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json(
            {
                message: error
            })
    }
}


const deleteManyProduct = async (req, res) => {
    try {
        const ids = req.body.ids
        if (!ids) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'The ids is required'
            })
        }
        const response = await ProductService.deleteManyProduct(ids)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json(
            {
                message: error
            })
    }
}

const getAllType = async (req, res) => {
    try {

        const response = await ProductService.getAllType()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json(
            {
                message: error
            })
    }
}


const searchProductByName = async (req, res) => {
    try {
        const { search } = req.query;
        if (!search) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'Search term is required'
            });
        }
        const response = await ProductService.searchProductByName(search);
        console.log('123123', response)
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};








module.exports = {
    createProduct,
    updateProduct,
    getDetailProduct,
    deleteProduct,
    getAllProduct,
    deleteManyProduct,
    getAllType,
    searchProductByName
}
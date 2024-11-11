const Product = require('../models/ProductModel')
const bcrypt = require('bcrypt')

const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, type, price, countInStock, rating, description, discount, imageDetail } = newProduct;

        try {
            // Kiểm tra nếu sản phẩm đã tồn tại
            const checkProduct = await Product.findOne({ name: name });
            if (checkProduct !== null) {
                return resolve({
                    status: 'ERROR',
                    message: 'The name of the product already exists'
                });
            }

            // Tạo sản phẩm mới
            const newProduct = await Product.create({
                name,
                type,
                price,
                countInStock,
                rating,
                description,
                discount,
                imageDetail
            });

            if (newProduct) {
                return resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: newProduct
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};


const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {

        try {
            const checkProduct = await Product.findOne(
                {
                    _id: id
                }
            )
            if (checkProduct === null) {
                resolve({
                    status: 'OK',
                    message: 'The product is not defined'
                })
            }

            const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true })

            resolve({
                status: 'OK',
                message: 'Succes',
                data: updatedProduct

            })



        } catch (e) {
            reject(e)
        }
    })
}

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {

        try {
            const checkProduct = await Product.findOne(
                {
                    _id: id
                }
            )
            if (checkProduct === null) {
                resolve({
                    status: 'OK',
                    message: 'The product is not defined'
                })
            }

            await Product.findByIdAndDelete(id)

            resolve({
                status: 'OK',
                message: 'Delete Product Succes',
            })



        } catch (e) {
            reject(e)
        }
    })
}

const getAllProduct = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.countDocuments()
            if (filter) {
                const label = filter[0]
                const allObjectFilter = await Product.find({ [label]: { '$regex': filter[1] } })
                resolve({
                    status: 'OK',
                    message: 'Succes',
                    data: allObjectFilter,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }
            if (sort) {
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
                const allProductSort = await Product.find().limit(limit).skip(limit * page).sort(objectSort)
                resolve({
                    status: 'OK',
                    message: 'Succes',
                    data: allProductSort,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }
            const allProduct = await Product.find().limit(limit).skip(limit * page)
            resolve({
                status: 'OK',
                message: 'Succes',
                data: allProduct,
                total: totalProduct,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalProduct / limit)
            })
        } catch (e) {
            reject(e)
        }
    })
}
const getDetailProduct = (id) => {
    return new Promise(async (resolve, reject) => {

        try {
            const product = await Product.findOne(
                {
                    _id: id
                }
            )
            if (product === null) {
                resolve({
                    status: 'OK',
                    message: 'The product is not defined'
                })
            }
            resolve({
                status: 'OK',
                message: 'Succes',
                data: product
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteManyProduct = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Product.deleteMany({ _id: { $in: ids } });
            resolve({
                status: 'OK',
                message: 'Delete Products Success',
            });
        } catch (error) {
            reject(error);
        }
    });
};

const getAllType = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allType = await Product.distinct('type')
            resolve({
                status: 'OK',
                message: 'Succes',
                data: allType
            })
        } catch (e) {
            reject(e)
        }
    })
}


const searchProductByName = async (search) => {
    try {
        const searchCondition = {
            name: {
                $regex: search,
                $options: 'i'
            }
        };


        const products = await Product.find(searchCondition);

        console.log('1231231', products)

        return {
            status: 'SUCCESS',
            products
        };
    } catch (error) {
        throw new Error('Error searching products: ' + error.message);
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
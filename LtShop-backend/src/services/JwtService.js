const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();

const genneralAccessToken = (payload) => {
    const access_token = jwt.sign({
        ...payload
    }, process.env.ACCESS_TOKEN, { expiresIn: '3h' })

    return access_token
}

const genneralRefreshToken = (payload) => {
    const refresh_token = jwt.sign({
        ...payload
    }, process.env.REFRESH_TOKEN, { expiresIn: '7d' })

    return refresh_token
}

const refreshTokenJwtService = (token) => {
    return new Promise(async (resolve, reject) => {

        try {

            jwt.verify(token, process.env.REFRESH_TOKEN, (err, user) => {
                if (err) {
                    resolve({
                        status: 'ERROR',
                        message: 'The authemtication'
                    })
                }
                const access_token = genneralAccessToken({
                    _id: user?.id,
                    isAdmin: user?.isAdmin
                })
                resolve({
                    status: 'OK',
                    message: 'Succes',
                    access_token
                })
            })

        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    genneralAccessToken,
    genneralRefreshToken,
    refreshTokenJwtService
}
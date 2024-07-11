const handleTryCatchError = (res, statusCode, message) => {
    res.status(statusCode).json({
        status: 'fail',
        message: message
    })
}
 
module.exports = handleTryCatchError
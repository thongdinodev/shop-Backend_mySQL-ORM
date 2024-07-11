const Joi = require('joi')

const productValidate = data => {
    const productSchema = Joi.object({
        name: Joi.string()
                .alphanum()
                .trim()
                .min(3)
                .max(50)
                .required(),
    
        price: Joi.number()
                .positive().error((errors) => new Error('"price" requires a positive number greater than 0'))
                .required(),
        description: Joi.string()
                .alphanum()
                .trim()
                .min(3)
                .required(),
    
        imageUrl: Joi.string()
                .required()
    })

    return productSchema.validate(data)
}


module.exports = {
    productValidate
}
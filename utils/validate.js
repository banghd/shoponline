const Joi = require('joi')

const registerValidate = (data) => {

    const schema = Joi.object({
        name: Joi.string()
            // .pattern(new RegExp(`^[a-zA-Z]{3,30}$`))
            .regex(/^[a-zA-Z, ]*$/ ,'Only letter')
            .min(3)
            .max(30)
            .required()
            .trim(),

        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })

    })
    return schema.validate(data)
}
const loginValidation = data =>{
    const schema = Joi.object({

        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })

    })
    return schema.validate(data)
}
module.exports = {registerValidate, loginValidation}
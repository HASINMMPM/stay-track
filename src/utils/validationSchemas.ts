import Joi from 'joi';

export class validationSchemas{
    registrationSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().length(6).required(),
        mobileNumber: Joi.string().pattern(/^\d{10}$/).required().messages({
            'string.pattern.base': 'Mobile number must be exactly 10 digits'
        }),
        name: Joi.string().required(),
        role: Joi.string().valid('admin', 'user', 'owner').default('user')
    })
    loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })
}



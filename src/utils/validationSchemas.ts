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
    
    createBuildingSchema = Joi.object({
        ownerId: Joi.string().required(),
        name: Joi.string().required(),
        local: Joi.string().required(),
        city: Joi.string().required(),
        thaluk: Joi.string().required(),
        district: Joi.string().required(),
        state: Joi.string().required(),
        lat: Joi.string().required(),
        long: Joi.string().required()
    })
    updateBuildingSchema = Joi.object({
        buildingId: Joi.string().min(4).required(),
        name: Joi.string().min(3),
        local: Joi.string().min(4),
        city: Joi.string().min(4),
        thaluk: Joi.string().min(4),
        district: Joi.string().min(4),
        state: Joi.string().min(4),
    });

    idSchema = Joi.object({
        id: Joi.string().required(),
    });

    getAllBuildingsSchema = Joi.object({
        pageNo: Joi.number().required(),
        limit: Joi.number().required(),
        sort: Joi.string(),
        filter: Joi.object(),
    });
    createLeaseSchema = Joi.object({
        buildingId: Joi.string().required(),
        tenantId: Joi.string().required(),
        moveIn: Joi.date().required(),
        moveOut: Joi.date(),
    });
    getLeaseByIdSchema = Joi.object({
        id: Joi.string().required(),
    });
    getAllLeasesSchema = Joi.object({
        pageNo: Joi.number().required(),
        limit: Joi.number().required(),
        sort: Joi.string(),
        filter: Joi.object(),
    });
}



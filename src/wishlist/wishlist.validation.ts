import Joi from 'joi';

export const wishlistValidation = Joi.object({
    products: Joi.array().required().unique()
});

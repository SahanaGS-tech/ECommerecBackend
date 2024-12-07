import Joi from 'joi';

export const cartDetailsValidator = Joi.object({
    cartItems: Joi.array().required(),
    productId: Joi.string(),
    quantity: Joi.string()
});

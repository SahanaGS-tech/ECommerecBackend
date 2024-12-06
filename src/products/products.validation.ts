import Joi from 'joi';

export const productsDeatilsValidation = Joi.object({
    productName: Joi.string().required(),
    primaryCategory: Joi.string().required(),
    secondaryCategory: Joi.string().required(),
    gender: Joi.string().required(),
    articleType: Joi.string().required(),
    season: Joi.string().required(),
    usage: Joi.string().required(),
    primaryColor: Joi.string().required(),
    imageUrl: Joi.string().required()
});

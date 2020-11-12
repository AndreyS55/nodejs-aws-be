import Joi from '@hapi/joi';
import { Product } from '../interfaces/product';

export const productBodySchema = Joi.object({
  title: Joi.string().min(3).max(80).required(),
  description: Joi.string().max(500),
  price: Joi.number().required(),
  imageUrl: Joi.string(),
  count: Joi.number().required(),
});

export const isValid = (body: Product) => productBodySchema.validate(body);

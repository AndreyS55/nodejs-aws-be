import Joi from '@hapi/joi';
import { Product } from '../interfaces/product';

export const productBodySchema = Joi.object({
  title: Joi.string().alphanum().min(3).max(55).required(),
  description: Joi.string().max(500),
  price: Joi.number().required(),
  imageUrl: Joi.string(),
  count: Joi.number().required(),
});

export const isValid = (body: Product) => productBodySchema.validate(body);

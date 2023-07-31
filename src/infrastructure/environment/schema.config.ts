import * as Joi from '@hapi/joi';

export const configValidationSchema = Joi.object({
  HOST_PORT: Joi.number().default(3000).required(),

  DB_HOST_TYPE: Joi.string().required(),
  DB_HOST_ADDRESS: Joi.string().required(),
  DB_HOST_PORT: Joi.number().required(),
  DB_HOST_USERNAME: Joi.string().required(),
  DB_HOST_PASSWORD: Joi.string().required(),
  DB_HOST_DATABASE: Joi.string().required(),

  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRE: Joi.number().default(3600).required(),
});

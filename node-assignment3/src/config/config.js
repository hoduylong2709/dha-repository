const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required().description(`${dotenv.MONGODB_URL}`),
    JWT_SECRET: Joi.string().required().description(`${dotenv.JWT_SECRET}`),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description(`${dotenv.JWT_ACCESS_EXPIRATION_MINUTES}`),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description(`${dotenv.JWT_REFRESH_EXPIRATION_DAYS}`),
    SMTP_HOST: Joi.string().description(`${dotenv.SMTP_HOST}`),
    SMTP_PORT: Joi.number().description(`${dotenv.PORT}`),
    SMTP_USERNAME: Joi.string().description(`${dotenv.SMTP_USERNAME}`),
    SMTP_PASSWORD: Joi.string().description(`${dotenv.SMTP_PASSWORD}`),
    EMAIL_FROM: Joi.string().description(`${dotenv.EMAIL_FROM}`),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: 10,
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.EMAIL_FROM,
  },
};

import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'
dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
})

export const HOST = process.env.HOST
export const LOCALHOST = process.env.LOCALHOST
export const CLIENT = process.env.CLIENT
export const PORT = process.env.PORT
export const SECRET_SAUCE = process.env.SECRET_SAUCE
export const SALT_ROUND = process.env.SALT_ROUND
export const REDIS_URL = process.env.REDIS_URL
export const MAILER_USERNAME = process.env.MAILER_USERNAME
export const MAILER_PASSWORD = process.env.MAILER_PASSWORD

export { cloudinary }

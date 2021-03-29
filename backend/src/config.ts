import dotenv from 'dotenv'
dotenv.config();

export default{
    DATABASE:process.env.MONGO_DATABASE||'gestion_tours',
    USER:process.env.MONGO_USER||'root',
    PASSWORD:process.env.MONGO_PASSWORD||'root',
    HOST:process.env.MONGO_HOST||'localhost',
    PORT: process.env.PORT||3000
}
import mongoose from "mongoose";
import { config } from "dotenv";
config();

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Database connection successful !');
    } catch (error) {
        console.log(error)
        console.log('Could not connect to database')
        process.exit(1);
    }
}

export default dbConnect
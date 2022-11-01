import mongoose from "mongoose";


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // useUnifiedTopology: true,
            // useNewUrlPaser: true,
            // useCreateIndex: true
        });
        console.log(`MongoDB Connected ${conn.connection.host}`.cyan.underline);


    }
    catch (error) {
        console.error(`Error :${error}`.red.underline.bold);
        process.exit();

    }
}

export default connectDB;
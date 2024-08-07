import chalk from "chalk";
import mongoose from "mongoose";


let isConnected = false;

export  const connectToDB = async ()=>{
    mongoose.set('strictQuery', true);

    if(isConnected){
        console.log(chalk.bgGreen("MongoDB is already connected"));
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName : "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,

        })

        isConnected = true;
        console.log(chalk.bgGreen("MongoDB connected!"));
        
    } catch (error) {
        console.log(chalk.bgRed(error));
        
    }


}
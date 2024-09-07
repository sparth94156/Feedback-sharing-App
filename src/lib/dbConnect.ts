"use server"
import mongoose from "mongoose";

// we're checking for the object which is going to come when we connect to DB
type connectionObject = {
    isConnected?: number
}

const connection: connectionObject = {};

async function connectToDB(): Promise<void>{

    if(connection.isConnected){
        console.log("Database already connected")
        return
    }
    try{
        const db = await mongoose.connect(process.env.MONGODB_URI || '' ,{})

        // set isConnected property to readyState (check the db object for more clarity)
        connection.isConnected = db.connections[0].readyState;
        console.log("Database connected successfully")
    }catch(error){
        console.log(`Error in connecting to database: ${error}`) 
        // In case of failure we simply exits from the process
        process.exit(1)
    }
}

export default connectToDB;


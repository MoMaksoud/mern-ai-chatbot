import { connect } from "mongoose";
async function connectToDatabase(){
  try {
    await connect(process.env.MONGODB_URI)

    } catch(error){
        console.log(error);
        throw new Error("Cannot connect to MongoDB");
    }
}

async function disconnectFromDatabase(){
    try {
        await disconnect();
    } catch (error) {
        console.log(error);
        throw new Error("Cannot connect to MongoDB");
    }
}

export {connectToDatabase, disconnectFromDatabase}
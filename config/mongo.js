const mongoose = require("mongoose");

async function CONNECT_MONGO()
{
    if(mongoose.connection.readyState === 1)
    {
        console.log("✅ MongoDB already connected");
        return;
    }

    try
    {
        await mongoose.connect(process.env.MONGODB_URL,{
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            maxPoolSize: 10
        });
        console.log("🚀 MongoDB connected successfully");
console.log("Host:", mongoose.connection.host);
console.log("Database:", mongoose.connection.name);
       /* console.log("🚀 MongoDB connected successfully");
        console.log(`Host: ${mongoose.connection.host}`);
        console.log(`Database: ${mongoose.connection.name}`);*/
    }
    catch(error)
    {
         console.error("❌ MongoDB connection failed");
    console.error(error);
    }
}

module.exports = CONNECT_MONGO;



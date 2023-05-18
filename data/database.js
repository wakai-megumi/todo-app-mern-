import mongoose from "mongoose";

//connecting to database
export const database = () => {
    mongoose.connect(process.env.DATABASE_DEPLOYED_URL,
        {
            dbname: "nodeapi_backend"
        }
    ).then((c) => console.log(`database connected at ${c.connection.host}`)).catch((e) => console.log(e))
}



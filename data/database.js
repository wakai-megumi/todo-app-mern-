import mongoose from "mongoose";

//connecting to database
export const database = () => {
    mongoose.connect(process.env.DATABASE_URL,
        {
            dbname: "nodeapi_backend"
        }
    ).then(() => console.log("database connected")).catch((e) => console.log(e))
}



import * as mongoose from "mongoose";
export const dbconnect = async () => {
    try {
        let connectionString = "";
        if (process.env.NODE_ENV == 'development') {
            connectionString = process.env.MONGODB_URI_LOCAL;
        }
        else {
            connectionString = process.env.MONGODB_URI_CLOUD;
        }
        mongoose.connect(connectionString).then(() => {
            console.log("mongodb connected");
        });
    }
    catch (err) {
        console.log("db connect error", err);
    }
};

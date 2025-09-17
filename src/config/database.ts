import { MONGO_URI } from "../utils/env";
import mongoose from "mongoose";

class DbConnection {
    async connectDB() {
        try {
            const res = await mongoose.connect(MONGO_URI);
            console.log(`💚 DB Connected ${res.connection.name} ${res.connection.port}`);
          
        } catch (error) {
            console.log(`💢Error in connecting db: `, error);
            process.exit(1);
        }
    }
}

export default DbConnection;
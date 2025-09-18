import { MONGO_URI } from "../utils/env";
import mongoose from "mongoose";

class DbConnection {
    async connectDB() {
        try {
            const res = await mongoose.connect(MONGO_URI);
            console.log(`\x1b[42m💚 DB Connected ${res.connection.name} ${res.connection.port}\x1b[0m`);
          
        } catch (error) {
            console.log(`\x1b[41m💢Error in connecting db: \x1b[0m`, error);
            process.exit(1);
        }
    }
}

export default DbConnection;
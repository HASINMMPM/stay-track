import "dotenv/config";
export const getEnv = (name: string) => {
    try {
        const env = process.env[name];

        if (!env) {
            throw new Error(`Environment variable ${name} is not set`);
        }
        return env;
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

export const PORT = parseInt(getEnv("PORT"));
export const MONGO_URI = getEnv("MONGO_URI");
export const JWT_SECRET = getEnv("JWT_SECRET");
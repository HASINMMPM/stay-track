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
export const SMTP_HOST = getEnv("SMTP_HOST");
export const SMTP_PORT = parseInt(getEnv("SMTP_PORT"));
export const SMTP_SECURE = getEnv("SMTP_SECURE") === "true";
export const SMTP_USER = getEnv("SMTP_USER");
export const SMTP_PASS = getEnv("SMTP_PASS");
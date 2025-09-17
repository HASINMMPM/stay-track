import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './env';
export class AuthUtils {
    async generateToken(userId: string, role: string) {
        return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: '1d' });
    }
}
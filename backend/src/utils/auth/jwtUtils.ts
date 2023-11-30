import jwt, { Secret } from 'jsonwebtoken';
import { IUser } from '@models/User.model';
import ErrorResponse from '@utils/responses/ErrorResponse';


const generateToken = (user: IUser) => {
    const SECRET_KEY: Secret = process.env.JWT_SECRET_KEY!;
    const data = {
        userid: user._id,
        username: user.username,
        role: user.role,
    }
    return jwt.sign(data, SECRET_KEY, { expiresIn: '7d', algorithm: 'HS256' });
};

const verifyToken = (token: string) => {
    try {
        const SECRET_KEY: Secret = process.env.JWT_SECRET_KEY!;
        const decoded = jwt.verify(token, SECRET_KEY);
        return decoded;
    } catch (error) {
        throw new ErrorResponse(401,"invalid token");
    }
};

export {
    generateToken,
    verifyToken
}
import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Users } from './../users/users.entity';
import { JWT } from '../config/config';

class AuthService {
    async login(email: string, password: string, res: Response) {
        try {
            const user = await Users.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'User not found' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }
            // Generate tokens
            const accessToken = jwt.sign({ id: user._id }, JWT.JWT_ACCESS_SECRET!, { expiresIn: JWT.JWT_ACCESS_EXPIRY });
            const refreshToken = jwt.sign({ id: user._id }, JWT.JWT_REFRESH_SECRET!, { expiresIn: JWT.JWT_REFRESH_EXPIRY });
            user.refreshToken = refreshToken;
            await user.save();
            return res.status(200).json({ accessToken, refreshToken });
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error', error });
        }
    }
    async refreshToken(req: Request, res: Response) {
        const { refreshToken }: any = req.body;

        if (!refreshToken) return res.status(400).json({ message: 'Refresh token missing' });

        try {
            // Verify refresh token
            const decoded: any = jwt.verify(refreshToken, JWT.JWT_REFRESH_SECRET!);

            // Ensure token exists in DB
            const user = await Users.findById(decoded.id);
            if (!user || user.refreshToken !== refreshToken) {
                return res.status(403).json({ message: 'Invalid refresh token' });
            }

            // Generate new access token
            const accessToken = jwt.sign({ id: user._id }, process.env.JWT_ACCESS_SECRET!, { expiresIn: process.env.JWT_ACCESS_EXPIRY });

            res.status(200).json({ accessToken });
        } catch (error) {
            res.status(403).json({ message: 'Invalid or expired refresh token' });
        }
    }
    async logout(req: Request, res: Response) {
        const { refreshToken }: any = req.body;

        try {
            const user = await Users.findOneAndUpdate({ refreshToken }, { refreshToken: null });
            if (!user) return res.status(404).json({ message: 'User not found' });

            res.status(200).json({ message: 'Logged out successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }
    async getUserByAccessToken(req: Request, res: Response, next: NextFunction) {
        const accessToken = req.headers.authorization?.replace('Bearer ', '') || '';
        const decoded = jwt.verify(accessToken, JWT.JWT_ACCESS_SECRET!) as { id: string };
        return await Users.findOne({ _id: decoded.id });
    }
}

export default new AuthService();

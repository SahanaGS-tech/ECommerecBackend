import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { Users } from './../users/users.entity';

async function login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
}

export default login;

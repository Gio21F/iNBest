import { Request, Response } from 'express';
import { User } from '../entities/User';
import { AppDataSource } from '../db/connection';
import { comparePasswords, generateToken, hashPassword, verifyToken } from '../auth';

export const signUp = async( req: Request , res: Response ) => {
    //Validaciones
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400).json({ message: 'Name, email, and password are required' });
        return
    }
    const validationError = validateEmailAndPassword(email, password);
    if (validationError) {
        res.status(validationError.status).json({ message: validationError.message });
        return;
    }
    try {
        const userRepository = AppDataSource.getRepository(User);
        const existingUser = await userRepository.findOneBy({ email });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }
     
        const hashedPassword = await hashPassword(password);
        const newUser = userRepository.create({
            name,
            email,
            password: hashedPassword,
        });
        await userRepository.save(newUser);
        const token = generateToken(newUser.id);
        res.status(201).json({
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
            },
            token,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

export const signIn = async( req: Request , res: Response ) => {
    //Validaciones
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: 'Email and password are required' });
        return;
    }
    const validationError = validateEmailAndPassword(email, password);
    if (validationError) {
        res.status(validationError.status).json({ message: validationError.message });
        return;
    }
    try {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({ email });
        if (!user) {
            res.status(400).json({ message: 'Invalid email' });
            return;
        }

        const isPasswordValid = await comparePasswords(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ message: 'Invalid password' });
            return;
        }
        
        const token = generateToken(user.id);
        res.status(200).json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            token,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

const validateEmailAndPassword = (email: string, password: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return { status: 400, message: 'Invalid email format' };
    }

    if (password.length < 6) {
        return { status: 400, message: 'Password must be at least 6 characters long' };
    }

    return null;
};


export const checkStatus = async (req: Request , res: Response) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return;
    }
    try {
        const decoded:any = verifyToken(token);
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({ id: decoded.userId });
        if (!user) {
            res.status(401).json({ message: 'Invalid token' });
            return;
        }
        const newToken = generateToken(user.id);
        res.status(200).json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            token: newToken,
        });
    } catch (error) {
        res.status(401).json({ message: 'Invalid token', error });
    }
}
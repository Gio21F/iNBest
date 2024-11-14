import { Request, Response } from 'express';
import { Jimp } from 'jimp';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { AppDataSource } from '../db/connection';
import { Image } from '../entities/Image';
import { User } from '../entities/User';
import fs from 'fs';

export interface ImageRequest extends Request {
    user?: User;
}

export const blur = async (req: ImageRequest, res: Response) => {
    const blurValue = parseInt(req.body.blur);
    const file = req.file;
    // Validaciones
    if (!file) {
        res.status(400).json({ message: 'No image uploaded.' });
        return;
    }

    const tempFilePath = file.path;
    if (isNaN(blurValue) || blurValue <= 0 || blurValue > 100) {
        if (fs.existsSync(tempFilePath)) {
            fs.unlinkSync(tempFilePath);
        }
        res.status(400).json({ message: 'Invalid blur value. Must be a number between 0 and 100.' });
        return;
    }
    try {
        const image = await Jimp.read(file.path);
        image.blur(blurValue);
        const imageUrl = await writeImageToDisk( image, file!.originalname )
        await saveImageUrlToDatabase(imageUrl, req.user);
        if (fs.existsSync(tempFilePath)) {
            fs.unlinkSync(tempFilePath);
        }
        res.status(200).json({
            message: "Image saved successfully",
            url: imageUrl
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const greyScale = async (req: ImageRequest, res: Response) => {
    const file = req.file;
    if (!file) {
        res.status(400).json({ message: 'No image uploaded.' });
        return;
    }
    const tempFilePath = file.path;
    try {
        const image = await Jimp.read(file.path);
        image.greyscale();
        const imageUrl = await writeImageToDisk( image, file!.originalname )
        await saveImageUrlToDatabase(imageUrl, req.user);
        if (fs.existsSync(tempFilePath)) {
            fs.unlinkSync(tempFilePath);
        }
        res.status(200).json({
            message: "Image saved successfully",
            url: imageUrl
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

export const resize = async (req: ImageRequest, res: Response) => {
    const w = parseInt(req.body.w);
    const h = parseInt(req.body.h);
    const file = req.file;
    if (!file) {
        res.status(400).json({ message: 'No image uploaded.' });
        return;
    }
    const tempFilePath = file.path;
    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
        if (fs.existsSync(tempFilePath)) {
            fs.unlinkSync(tempFilePath);
        }
        res.status(400).json({ message: 'w and h are required, they cannot be 0' });
        return;
    }
    try {
        const image = await Jimp.read(file.path);
        image.resize({ w, h });
        const imageUrl = await writeImageToDisk( image, file!.originalname )
        await saveImageUrlToDatabase(imageUrl, req.user);
        if (fs.existsSync(tempFilePath)) {
            fs.unlinkSync(tempFilePath);
        }
        res.status(200).json({
            message: "Image saved successfully",
            url: imageUrl
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const UPLOAD_DIR = path.resolve(__dirname, '../uploads');

if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const writeImageToDisk = async (image: any, originalFileName: string) => {
    const fileName = `${uuidv4()}${path.extname(originalFileName)}`;
    const filePath = path.join(UPLOAD_DIR, fileName);
    try {
        image.write(filePath);
        return `http://localhost:8000/uploads/${fileName}`;
    } catch (error) {
        console.error('Error saving image to disk:', error);
        throw new Error('Failed to save image to disk');
    }
};

const saveImageUrlToDatabase = async (url: string, user: User | undefined) => {
    const imageRepository = AppDataSource.getRepository(Image);
    const newImage = imageRepository.create({ url, user });
    await imageRepository.save(newImage);
    return url;
};

export const getImagesByUser = async (req: ImageRequest, res: Response) => {
    const imageRepository = AppDataSource.getRepository(Image);
    const userId = req.user?.id;
    try {
        const images = await imageRepository.find({
            where: { user: { id: userId } },
            order: { created_at: 'DESC' }
        });

        res.status(200).json({
            images
        })
    } catch (error) {
        res.status(500).json({ message: 'Server error',error: error });
    }
};

export const getAllImages = async (req: ImageRequest, res: Response) => {
    const imageRepository = AppDataSource.getRepository(Image);
    try {
        const images = await imageRepository.find({ order: { created_at: 'DESC' } });
        res.status(200).json({
            images
        })
    } catch (error) {
        res.status(500).json({ message: 'Server error',error: error });
    }
};


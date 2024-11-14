import { Request, Response, NextFunction, Router } from 'express';
import multer, { MulterError } from 'multer';
import { blur, getAllImages, getImagesByUser, greyScale, resize } from '../controllers/images';
import { authMiddleware } from '../middleware/authMiddleware';
const upload = multer({ dest: 'src/uploads/' });

const multerErrorHandler = (
  err: any, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  if (err instanceof MulterError) {
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      res.status(400).json({ message: 'Only one image is allowed.' });
      return;
    }
  }
  next(err);
};

const router = Router();
router.get('/', authMiddleware, getImagesByUser)
router.get('/all', authMiddleware, getAllImages)
router.post('/blur', authMiddleware, upload.single('image'), blur, multerErrorHandler)
router.post('/resize', authMiddleware, upload.single('image'), resize, multerErrorHandler )
router.post('/greyscale', authMiddleware, upload.single('image'), greyScale, multerErrorHandler )

export default router;
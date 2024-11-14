import { Router } from 'express';
import { signIn, signUp, checkStatus } from '../controllers/auth';

const router = Router();

router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/check-status', checkStatus)
export default router;
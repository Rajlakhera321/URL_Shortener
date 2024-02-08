import { Router } from "express";
const router = Router();
import { deleteUrlByUserId, generateShortUrl, getAnalytics, getShortUrl, getUrlById, getUrlByUserId } from "../controller/url.js";
import auth from '../middleware/token.js';

router.post('/createURL', auth.verifyToken , generateShortUrl);

router.get('/:sortId', getShortUrl);

router.get('/anaytics/:sortId', auth.verifyToken, getAnalytics);

router.get('/urlId/:id', auth.verifyToken, getUrlByUserId);

router.delete('/urlId/delete/:id', auth.verifyToken, deleteUrlByUserId);

router.get('/url/:id', auth.verifyToken, getUrlById);

export default router;
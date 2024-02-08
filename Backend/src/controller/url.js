import urlModel from '../model/url.js';
import {nanoid} from 'nanoid';
import mongoose, {ObjectId} from 'mongoose';

export const generateShortUrl = async (req,res) => {
    try {
        const shortURL = nanoid(10);
        await urlModel.create({
            userId: req.userData._id,
            shortUrl: shortURL,
            originalUrl: req.body.url,
            visitHistory: []
        })
        return res.status(201).json({message: "Short URL created", shortid: shortURL});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export const getShortUrl = async (req,res) => {
    try {
        const shortURL = req.params.sortId;
        const data = await urlModel.findOneAndUpdate({
            shortUrl: shortURL,
        },{
            $push: {
                visitHistory: { time : Date.now()}
            }
        })
        return res.redirect(data.originalUrl);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export const getAnalytics = async (req,res) => {
    try {
        const shortURL = req.params.sortId;
        const result = await urlModel.findOne({_id: shortURL});
        return res.status(200).json({totalClicks: result.visitHistory.length, analytics: result.visitHistory});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export const getUrlByUserId = async (req,res) => {
    try {
        const {id} = req.params;
        const data = await urlModel.find({userId: new mongoose.Types.ObjectId(id)});
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export const deleteUrlByUserId = async (req,res) => {
    try {
        const {id} = req.params;
        await urlModel.findByIdAndDelete({_id: new mongoose.Types.ObjectId(id)});
        return res.status(200).json("URL deleted successfully");
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export const getUrlById = async (req,res) => {
    try {
        const {id} = req.params;
        const data = await urlModel.find({_id: new mongoose.Types.ObjectId(id)});
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}
var express = require('express');
var router = express.Router();
const Request = require("../model/Request")
const News = require("../model/News")
const Category = require("../model/Category")
const User = require("../model/User")
const Enum = require("../helper/enum")
const moment = require('moment');

router.get('/', async (req, res, next) => {
    let requests = await Request.aggregate([
        {
            $lookup:{
                from: News.collection.collectionName,
                localField: "receiveUserId",
                foreignField: "_id",
                as: "news"
            }
        },
        {
            $unwind:"$news"
        },

        {
            $lookup:{
                from: Category.collection.collectionName,
                localField: `${News.collection.collectionName}.category`,
                foreignField: "_id",
                as: "categories"
            }
        },
        {
            $unwind:"$categories"
        },

        {
            $lookup:{
                from: User.collection.collectionName,
                localField: `${News.collection.collectionName}.creator`,
                foreignField: "_id",
                as: "users"
            }
        },
        {
            $unwind:"$users"
        }
    ]);
    res.render('index', {title: 'Express', requests: requests, moment: moment, Enum:Enum});
});


router.post('/', async (req, res, next) => {
    let param = req.body
    let request_condition = {}
    let news_condition = {}
    if (param.user) {
        request_condition["$or"] = [ {'senderName':{'$regex': param.user}}, {'senderEmail':{'$regex': param.user}}, {'senderPhone':{'$regex': param.user}} ]
    }
    if (param.status) {
        request_condition["status"] = parseInt(param.status)
    }
    if (param.supportCount) {
        request_condition["supportCount"] = parseInt(param.supportCount)
    }
    if (param.type) {
        request_condition["type"] = param.type
    }
    if (param.viewAt_from || param.viewAt_to) {
        request_condition["viewAt"] = {}
        if (param.viewAt_from){
            request_condition["viewAt"]["$gte"] = new Date(param.viewAt_from)
        }
        if (param.viewAt_to){
            request_condition["viewAt"]["$lt"] = new Date(param.viewAt_to)
        }
    }
    if (param.createdAt_from || param.createdAt_to) {
        request_condition["createdAt"] = {}
        if (param.createdAt_from){
            request_condition["createdAt"]["$gte"] = new Date(param.createdAt_from)
        }
        if (param.createdAt_to){
            request_condition["createdAt"]["$lt"] = new Date(param.createdAt_to)
        }
    }

    if (param.is_crawl) {
        news_condition["news.is_crawl"] = param.is_crawl === "true"
    }
    if (param.title) {
        news_condition["news.title"] = {'$regex': param.title}
    }

    let requests = await Request.aggregate([
        {
            $lookup:{
                from: News.collection.collectionName,
                localField: "receiveUserId",
                foreignField: "_id",
                as: "news"
            }
        },
        {   $unwind:"$news" },

        {
            $lookup:{
                from: Category.collection.collectionName,
                localField: `${News.collection.collectionName}.category`,
                foreignField: "_id",
                as: "categories"
            }
        },
        {
            $unwind:"$categories"
        },

        {
            $lookup:{
                from: User.collection.collectionName,
                localField: `${News.collection.collectionName}.creator`,
                foreignField: "_id",
                as: "users"
            }
        },
        {
            $unwind:"$users"
        },

        {
            $match: {...request_condition, ...news_condition}
        },

    ]);

    res.render('index', {title: 'Express', requests: requests, moment: moment, param: param, Enum:Enum});
});


module.exports = router;

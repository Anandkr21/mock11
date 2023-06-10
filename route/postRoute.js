const express = require('express');
const { postModel } = require('../model/postModel')
const postRouter = express.Router();


// Post API
postRouter.post('/post', async (req, res) => {
    try {
        const { name, email, destination, travelers, budget } = req.body;
        const addData = new postModel({ name, email, destination, travelers, budget })
        await addData.save();
        res.status(200).send({
            status: true,
            msg: "Data added successfully."
        })
    } catch (error) {
        res.status(404).send({
            status: false,
            msg: 'Error in adding a new item to the list.'
        })
    }
})


// Retrive API 
postRouter.post('/destination/:id', async (req, res) => {
    try {
        const id = req.query.id
        const destination = req.query.destination
        if (id) {
            const planById = await postModel.find({ _id: id });
            res.status(200).send({
                status: true,
                msg: `Plan ID : ${id}`,
                data: planById
            })
        } if (destination) {
            const planByDestination = await postModel.find({ destination: destination });
            res.status(200).send({
                status: true,
                msg: `Plan with the specific destination : ${destination}`,
                data: planByDestination
            })
        } if (!id && !destination) {
            const plan = await postModel.find();
            res.status(200).send({
                status: true,
                msg: "Available Plans",
                data: plan
            })
        }
    } catch {
        res.status(404).send({
            status: false,
            msg: "Error in fetching."
        })
    }
})


// Delete API
postRouter.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await postModel.findByIdAndDelete({ _id: id }),
            res.status(200).send({
                status: true,
                msg: `Plan deleted, ID : ${id}`
            })
    } catch {
        res.status(500).send({
            status: false,
            msg: "Error in deletion."
        })
    }
})


// get all data 
postRouter.get('/alldata', async (req, res) => {
    try {
        const alldata = await postModel.find()
        res.status(200).send(alldata)
    } catch (error) {
        res.status(404).send({ msg: 'Something error' })
    }
})


// Sort API in asc 
postRouter.get('/asc', async(req,res) =>{
    try {
        const data = await postModel.find().sort({ budget: 1 });
        res.status(200).send({
            status: true,
            data: data
        })
    } catch {
        res.status(500).send({
            status: false,
            msg: "Error in Sorting"
        })
    }
})


// Sort API in decs 
postRouter.get('/decs', async(req,res) =>{
    try {
        const data = await postModel.find().sort({ budget: -1 });
        res.status(200).send({
            status: true,
            data: data
        })
    } catch {
        res.status(500).send({
            status: false,
            msg: "Error in Sorting"
        })
    }
})

module.exports = { postRouter }
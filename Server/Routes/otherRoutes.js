const express = require('express')
const Route2 = express.Router()
const Review = require("../Models/reviews")




Route2.post('/addreview', async (req,res)=>{
    try{
        const addReview = await Movies.insert(req.body)
        res.status(201).json(addReview)
         }
         catch(error){
             res.status(501).json({message: "failed to add review",  error:error.message})
         }
})


Route2.delete('/delete/review', async (req,res)=>{
  try{
    const deleteReview = await Review.deleteOne(req.body)
    res.status(201).json(deleteReview)
  }
  catch(error){
    res.status(501).json({meg: 'failed to delete', error:error.meg})
  }
})

module.exports = Route2
// Models/recommended.js
const mongoose = require("mongoose");

const MovieRecommended = new mongoose.Schema({
  title: {
    type : String,
    unique : true
    
 },
 overview:{
     type: String,
     unique: true
 },
 release_date:{
     type: String,
     require: true
 },
 vote_average:{
     type: Number
 },
 poster_path:{
     type: String
 },
 poster_url:{
     type: String
 }
});

const RecommendedMovies = mongoose.model("RecommendedMovies", MovieRecommended); // ✅ Correct model name

module.exports = RecommendedMovies;

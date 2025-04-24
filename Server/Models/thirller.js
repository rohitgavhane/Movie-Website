const mongoose = require("mongoose");

const ThrillerSchema = new mongoose.Schema({
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
 },
  genre: String, // Add genre field if necessary
});

const ThrillerMovies = mongoose.model("ThrillerMovies", ThrillerSchema);
module.exports = ThrillerMovies;
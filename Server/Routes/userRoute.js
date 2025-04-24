const express = require("express")
const route = express.Router()

const Movies = require("../Models/moviemodel")


route.get("/getallMovies", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 15;
  const skip = (page - 1) * limit;

  const search = req.query.search || "";

  const query = search
    ? { title: { $regex: search, $options: "i" } } // case-insensitive title match
    : {};

  try {
    const total = await Movies.countDocuments(query);
    const movies = await Movies.find(query).skip(skip).limit(limit);

    res.json({
      movies,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("Error fetching movies:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

  
 route.get("/searchMovies", async (req, res) => {
    try {
        const { title } = req.query;
        if (!title) {
            return res.status(400).json({ message: "Title query parameter is required" });
        }

        const movies = await Movies.find({
            title: { $regex: title, $options: 'i' } // Case-insensitive search
        }).limit(15); // Limit results to 15

        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: "Failed to search movies", error: error.message });
    }
});

    

route.post('/addmovie',async (req,res)=>{
    try{
   const AddMovie = await Movies.insertMany(req.body)
   res.status(201).json(AddMovie)
    }
    catch(error){
        res.status(501).json({message: "failed to add movie",  error:error.message})
    }
})



route.get('/getmovie/:id', async (req, res) => {
    try {
      console.log("Fetching movie with ID:", req.params.id); // debug
      const GetMovie = await Movies.findById(req.params.id);
  
      if (!GetMovie) {
        return res.status(404).json({ message: "Movie not found" });
      }
  
      res.status(200).json(GetMovie); // use 200
    } catch (error) {
      res.status(500).json({ message: "Failed to get movie", error: error.message }); // 500 for server error
    }
  });



  // external api



  
module.exports = route
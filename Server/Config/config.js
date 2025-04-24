const mongoose = require("mongoose")

const url = "mongodb://localhost:27017/Movies";

async function main(){
     await mongoose.connect(url);
}
main().then(()=>{
     console.log("MongoDB Connected Successfully")
})
.catch((err)=>{
    console.log(err)
})


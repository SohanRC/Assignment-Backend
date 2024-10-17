import express from "express"
import {config} from "dotenv"
config();
import dbConnect from "./config/dbConnect.js";
import cors from "cors"
import ComicManagementRoute from "./routes/ComicManagementRoute.js"





const app = express();
const PORT = process.env.PORT || 4000;

// middlewares
app.use(cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}))
app.use(express.json());


// routes
app.use('/api/comicManagement', ComicManagementRoute)



dbConnect().then(() => {
    app.listen(PORT, (err) => {
        if (err) throw err;
        console.log(`Server running at port : ${PORT}`)
    })
}).catch(err => {
    console.log(err);
})


// error middleware
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Internal Server Error"

    return res.status(errorStatus).json({
        success: false,
        errorMessage
    })
})
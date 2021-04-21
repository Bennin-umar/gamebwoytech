const express = require("express")
const dotenv = require("dotenv")
const morgan = require("morgan")
const connectDB = require("./config/connectDB")
const cors =require('cors')
const customersRoute = require("./routes/customersRoute")
const techniciansRoute =require('./routes/techniciansRoute')
const usersRoute = require("./routes/usersRoute")

dotenv.config()

const app = express()

//connection
connectDB();

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//routes
app.use("/api/v2/customers", customersRoute);
app.use('/api/v2/technicians',techniciansRoute)
app.use("/api/v2/users", usersRoute);

//home route
app.get("/", (req,res)=> {
    res.send("<h1>welcome to our customers api</h1>")
})

const port = process.env.PORT || 7070;

app.listen(port, () => console.log(`server started on port ${port}`))
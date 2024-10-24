require("dotenv").config()
const express = require('express')
const cors = require('cors')
const businessRouter =require("./routers/business")
const authRouter =require("./routers/auth")
const userRouter =require("./routers/users")
const app = express()

const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use(businessRouter)
app.use(authRouter)
app.use(userRouter)
app.get('/', (req, res)=>{
  res.json('Welcome to my server')
})


app.listen(PORT, ()=>{
  console.log('Server is listening on port:', PORT)
})
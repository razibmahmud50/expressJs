const express = require('express')
const path = require('path')
const logger = require('./middleware/logger')

const app = express()

// middleware init
//app.use(logger)
//body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))



app.use(express.static(path.join(__dirname,'public')))
app.use('/api/members', require('./routes/api/members'))




const port= process.env.PORT || 5000
app.listen(port, () => console.log(`server started in port ${port}`))
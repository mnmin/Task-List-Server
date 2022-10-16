//import 'dotenv/config'
import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import { sendDataResponse } from './utils/responses'

//Create a new express application
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//Tell express we want to use the morgan library
app.use(morgan("dev"))
//Tell express we want to use the cors library
app.use(cors())

app.get('*', (req, res) => {
    res.status(404).json({
      status: 'fail',
      data: {
        resource: 'Not found'
      }
    })
  })
  app.use((error, req, res, next) => {
    console.error(error)
  
    if (error.code === 'P2025') {
      return sendDataResponse(res, 404, 'Record does not exist')
    }
  
    return sendDataResponse(res, 500)
  })
  
  const port = process.env.PORT || 4000
  
  app.listen(port, () => {
    console.log(`\n Server is running on port ${port}\n`)
  })
  
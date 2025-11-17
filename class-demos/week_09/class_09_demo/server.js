import express from 'express'

const app = express()

app.use(express.static('dist'))

app.listen(5001, ()=>{
    console.log('app is running at http://127.0.0.1:5001')
})
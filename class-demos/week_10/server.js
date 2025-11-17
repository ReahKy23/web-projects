const express = require('express')
const parser = require('body-parser')
const multer = require('multer')
const nedb = require('@seald-io/nedb')

const encodedParser = parser.urlencoded({extended: true})
const upladProcessor = multer({dest: 'public/upload'})

// added database variable to keep track of database file
let database = new nedb({
    filename: 'database.txt',
    autoload: true
})

const app = express()

// app.use is midleware; happens in between set up and the routes that it receives
// create public folder
app.use(express.static('public'))
app.use(encodedParser)

// set first route
app.get('/', (req, res)=>{
    res.sendFile('index.html', {root: "public"})
})

app.post('/upload', upladProcessor.single('imgUpload'), 
(req, res)=>{ 
    console.log(req.body)

    let data = {
        postText: req.body.text,
        postTime: Date.toLocaleString(),
        postTimestamp: Date.now(),
    }

    //  2 params for insert()
    // 1. data to be added
    // 2. callback for after the data is added
    database.insert(data, (err, dataToBeAdded)=>{
        if(err){
            res.redirect('/')
        }else{
            console.log(dataToBeAdded)
            res.redirect('/')
        }
    })
})

app.listen(6004, ()=>{
    console.log('app is running on http://127.0.0.1:6004')
})
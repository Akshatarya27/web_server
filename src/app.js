const path = require('path')
const express = require('express')
const port = 3000
const app = express()
const hbs = require('hbs')
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

console.log(__dirname)
console.log(path.join(__dirname, ("../public")))

const publicpath = path.join(__dirname, "../public")
const viewpath = path.join(__dirname, "../templates/views")
const partialpaths = path.join(__dirname, "../templates/partials")


app.set('view engine', 'hbs')
app.set("views", viewpath)
hbs.registerPartials(partialpaths)


app.use(express.static(publicpath))
//USE ALL FILES FROM THIS DIRECTORY..

console.log(viewpath)


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Akshat Arya',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: 'Akshat Arya',
    })
})
app.get("/help", (req, res) => {
    res.render('help', {
        title: "HELP",
        name: "Akshat Arya",
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({ error:"YOU MUST PROVIDE AN ADDRESS!!"})  
    }
    // res.send({
    //     forecast:"Its looing",
    //     location:req.query.address
    // })

    geocode(req.query.address, (error, {latitude,longitude,location}={} ) => {
        if(error){
            return res.send({ error })
        }
    
        forecast(latitude,longitude,(error,dat) =>{
            if (error){
                return res.send({error})
            }
            res.send({
                forecast: dat,
                location,
                address: req.query.address
            })   
            
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error:"YOU MUST PROVIDE A SEARCH TERM!!"
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    }) 
})

app.get("/help/*", (req, res) => {
    res.render('404', {
        title:"404",
        error: "Help Article Not Found!",
        name: 'Akshat Arya'
    })
})

app.get("*", (req, res) => {
    res.render('404', {
        title:"404",
        error: "Page Not Found",
        name: 'Akshat Arya'
    })
})

//app.com
//app.com/help
//app.com/about

app.listen(3000, () => {
    console.log(`Server is up here at ${port}`)
})
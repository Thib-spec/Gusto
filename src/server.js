// serveur 
// contiendra la configuration entre le server http et l'application express
const http = require('http')
const path = require('path')
const routes = require("./route")

// config variables d'environnement du projet
let envPath = __dirname + '/../.env'
console.log(envPath)
require('dotenv').config({ path: envPath })

// config serveur
const HOST = "localhost"
const PORT = process.env.PORT
console.log(process.env.DB_USER)
console.log(process.env.DB_PASSWORD)

// configuration

const app = require("express")()
const serverHttp = http.createServer(app)
const passport = require("passport")
app.use('/api', routes)

const models=require("./database/models")
// config passport
require("./config/passport").config({passport, models})
// config app
require("./app")(app)

// run serveur
serverHttp.listen(PORT,()=>{
    console.log(`server is running  at http://${HOST}:${PORT}/`)
})



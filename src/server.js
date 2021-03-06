// serveur 
// contiendra la configuration entre le server http et l'application express
const http = require('http')
const path = require('path')

// config variables d'environnement du projet
let envPath = __dirname + '/../.env'
require('dotenv').config({ path: envPath })

// config serveur
const HOST = "localhost"
const PORT = process.env.PORT

// configuration

const app = require("express")()
const serverHttp = http.createServer(app)
const passport = require("passport")

const models=require("./database/models")
// config passport
require("./config/passport").config({passport, models})
// config app
require("./app")(app)

// run serveur
serverHttp.listen(PORT,()=>{
    console.log(`server is running  at http://${HOST}:${PORT}/`)
})



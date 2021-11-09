// Express 
// contiendra la configuration de l'application express
// port mysql : 35188
const express= require("express")
const cookieParser = require('cookie-parser')
const path = require('path')
const passport = require("passport")
var createError = require('http-errors')

// ========== routers ========== //

const swaggerRouter=require("./config/swaggerUi/swaggerRouter")

module.exports=(app)=>{

    // ========== middlewares ========== //

        // add cors
    app.use(require("cors")())
        // parse urlencoded request body
    app.use(express.urlencoded({extended: true}))
        // parse json request body
    app.use(express.json())  
        // parse cookies
    app.use(cookieParser())
        // jwt authentication
    app.use(passport.initialize())
        // si jamais l'on veut servir des fichiers publiques
    //app.use(express.static(path.join(__dirname, 'Public')))

    // ========== routes ========== //

    app.use('/api-docs',swaggerRouter)

    // ========== Handler Routing ========== //

    // Handler 404
    app.use(function(req, res, next) {
        const response = {

        }
        return next(createError(404, "Page not found"))
        return next({
            success:0,
            status:404,
            message:"Page not found"
        })
    })
    
    // Error Handler
    app.use((err, req, res, next) => {

        let response={
            success: 0,
            status: err.status ? err.status : 500,
            message: err.status ? err.message : "Server Broken",
        }
    
        if (response.status==500) console.log(err.stack)
    
        res.status(response.status)
        res.json(response)
        })
}

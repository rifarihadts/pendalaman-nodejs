const bodyParser = require('body-parser')
const express = require('express')
const hbs = require('hbs')
const morgan = require('morgan')
const path = require('path')
const database = require('./database')


// import express from 'express'
// import hbs from 'hbs'
// import path from 'path'
// import morgan from 'morgan'
// import bodyParser from 'body-parser'
// import {initDatabase, initTable, insertProduct} from './database.js'
// const __dirname = path.resolve()

const app = express()

const db = database.initDatabase()
database.initTable(db)

app.set('views', __dirname+'/layouts')
app.set('view engine', 'html')
app.engine('html', hbs.__express)

app.use(morgan('combined'))

//parse request body
app.use(bodyParser.urlencoded({extended:false}))

//server static file
app.use('/assets', express.static(__dirname + '/assets'))

app.get('/', (req, res, next) => {
    res.send({success:true})
})

//get product list
app.get('/product', async (req, res, next) => {
    // database.getProduct(db).then(product  => {
    //     console.log('Product Result', product)
    //     res.render('product')
    // }).catch(error => {
    //     console.error(error)
    // })
    let product 
    try {
        products = await database.getProduct(db)
    } catch (error) {
        return next(error)
    }
    // console.log('Product Result', product)
    res.render('product', {products})
})

//handle form GET METHOD
app.get('/add-product', (req, res, next) => {
    database.insertProduct(db, req.query.name, parseInt(req.query.price), '-')
    // res.send(req.query)

    res.redirect('/product')
})

// handle form POST METHOD
app.post('/add-product', (req, res, next) => {
    console.log('Request', req.body)
    database.insertProduct(db, req.body.name, parseInt(req.body.price), '-')
    res.send(req.body)
})

app.use((err, req,res,next) => {
    res.send(err.message)
})

app.listen(3000, () => {
    console.log('App listen on port 3000')
})
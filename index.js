import express from 'express'

const __dirname = path.resolve()
const app = express()


app.send('views', __dirname+'/layouts')
app.set('view engine', 'hbs')
app.engine('html', hbs.__express)


app.get('/', (req, res, next) => {
    res.send({success:true})
})

app.use((err, req,res,next) => {
    res.send(err.message)
})

app.listen(3000, () => {
    console.log('App listen on port 3000')
})
const express = require('express')
const app = express()
const port = 3000
const Controller = require('./controllers/index')
const {authentication} = require('./middleware/authentication')
const {authorization} = require('./middleware/authorization')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.post('/user/register', Controller.register)
app.post('/user/login', Controller.login)
// app.use(authentication)
// app.get('/user',Controller.liatUser)
app.get('/book',Controller.getBooks)
app.post('/book',Controller.addBooks)
app.put('/book/:id',authorization,Controller.editBooks)
app.delete('/book/:id',authorization,Controller.deleteBook)
app.get('/genre',Controller.readGenre)
app.post('/genre',Controller.createGenre)
app.put('/genre/:id',Controller.editGenre)
app.delete('/genre/:id',Controller.deleteGenre)
app.get('/bookgenre', Controller.liatBookGenre)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

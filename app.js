const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000
const movies = require('./public/jsons/movies.json').results //把movie.json的資料放進變數
const BASE_IMG_URL = 'https://movie-list.alphacamp.io/posters/'

app.engine('.hbs', engine({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect('/movies') //網站的首頁會直接導向電影清單。
})

app.get('/movies', (req, res) => {
  res.render('index', { movies, BASE_IMG_URL}) //放要讀取的檔案名稱,變數
})

app.get('/movie/:id', (req, res) => {
  const id = req.params.id //拿到的id是字串
  const movie = movies.find((mv) => mv.id.toString() === id)
  res.render(`detail`, { movie, BASE_IMG_URL})
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})
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
  const keyword = req.query.search?.trim() //req.query + 定義在index.hbs上的名字
  const matchedMovies = keyword ? movies.filter((mv) =>  //keyword存在才放入matchedMovies
    Object.values(mv).some((property) => {  //拿到所有movies的值
      if(typeof property === 'string') {
        return property.toLowerCase().includes(keyword.toLowerCase())
      }
      return false
    }) 
  ) : movies //不存在keyword顯示原本movies
  res.render('index', { movies: matchedMovies, BASE_IMG_URL, keyword}) //放要讀取的檔案名稱,變數
})

app.get('/movies/:id', (req, res) => {
  const id = req.params.id //拿到的id是字串
  const movie = movies.find((mv) => mv.id.toString() === id)
  res.render('detail', { movie, BASE_IMG_URL})
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})
const express = require('express')
const app = express()
const port = 3000

// Richiamo le rotte di post
const postRouters = require(`./routers/posts.js`)

// richiamo i middleware
const errorHandler = require(`./middlewares/errorHandler.js`)
const notfound = require(`./middlewares/notFound.js`)


app.use(express.static(`public`))
app.use(express.json())


app.get('/', (req, res) => {
  res.send('Server del mio blog')
})


app.use(`/posts`, postRouters)

app.use(errorHandler)

app.use(notfound)

app.listen(port, () => {
  console.log(`Il server rimane in ascolto sulla porta ${port}`)
})


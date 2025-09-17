// importiamo l'array
const posts = require(`../data/postsList.js`)

// Index
const index = (req, res) => {
  //  implementazione di un filtro di ricerca
  const tags = req.query.tags

  let filteredPost = posts

  if (tags) {
    filteredPost = posts.filter(item => {
      return item.tags.map(tags => tags.toLowerCase()).includes(tags.toLowerCase())
    })
  }

  res.json(filteredPost)
}


// Show
const show = (req, res) => {
  const id = parseInt(req.params.id);

  const post = posts.find(item => item.id === id)

  if (!post) {
    return res.status(404).json({ error: "404 Not Found", message: "Post non trovato" })
  }

  res.json(post)
}


// Create
const store = (req, res) => {
  const newId = posts[posts.length - 1].id + 1

  const { title, content, image, tags } = req.body

  const newPost = {
    id: newId,
    title,
    content,
    image,
    tags
  }

  posts.push(newPost)

  console.log(posts)

  res.status(201).json({ result: true, message: `Inserimento avvenuto con successo` })
}


// Update
const update = (req, res) => {
  const id = parseInt(req.params.id);

  const post = posts.find(item => item.id === id)

  if (!post) {
    return res.status(404).json({ error: "404 Not Found", message: "Post non trovato" })
  }

  post.title = req.body.title
  post.content = req.body.content
  post.image = req.body.image
  post.tags = req.body.tags

  console.log(posts)

  res.json(post)
}


// Modify
const modify = (req, res) => {
  const id = parseInt(req.params.id);

  const post = posts.find(item => item.id === id)

  if (!post) {
    return res.status(404).json({ error: "404 Not Found", message: "Post non trovato" })
  }

  post.title = req.body.title

  console.log(posts)

  res.json(post)
}


// Delete
const destroy = (req, res) => {
  const id = parseInt(req.params.id);

  const post = posts.find(item => item.id === id)

  if (!post) {
    return res.status(404).json({ error: "404 Not Found", message: "Post non trovato" })
  }

  posts.splice(posts.indexOf(post), 1)

  res.sendStatus(204)
}


module.exports = {
  index,
  show,
  store,
  update,
  modify,
  destroy
}
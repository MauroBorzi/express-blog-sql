// importiamo l'array
const connection = require(`../data/db.js`)

// Index
const index = (req, res) => {

  const sql = `SELECT * FROM posts`

  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database query failed' })
    res.json(results)
  })

}


// Show
const show = (req, res) => {

  const { id } = req.params

  const sql = 'SELECT * FROM posts WHERE id = ?'

  const tagsSql = `
  SELECT tags.id, tags.label
  FROM tags
  JOIN post_tag ON post_tag.tag_id = tags.id
  WHERE post_tag.post_id = ?
  `

  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Post query failed' })
    if (results.length === 0) return res.status(404).json({ error: 'Post not found' })

    connection.query(tagsSql, [id], (err, tagResults) => {
      if (err) return res.status(500).json({ error: 'Tag query failed' })

      const postAndTag = {
        ...results[0],
        tag: tagResults
      }

      res.json({ postAndTag })
    })

  })

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

  const { id } = req.params

  connection.query('DELETE FROM posts WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: 'Failed to delete post' })
    res.sendStatus(204)
  })

}


module.exports = {
  index,
  show,
  store,
  update,
  modify,
  destroy
}
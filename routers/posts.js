// Importo express
const express = require(`express`)
const router = express.Router()

// importo il controller per i post
const { index, show, store, update, modify, destroy } = require(`../controllers/controllerPost.js`)



// Index
router.get(`/`, index)


// Show
router.get(`/:id`, show)


// Create
router.post(`/`, store)


// Update
router.put(`/:id`, update)


// Modify
router.patch(`/:id`, modify)


// Delete
router.delete(`/:id`, destroy)

module.exports = router
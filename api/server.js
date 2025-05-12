// Careful with your path matching syntax if you upgrade to Express 5
// [Moving to Express 5](https://expressjs.com/en/guide/migrating-5.html#path-syntax)

const path = require('path')
const express = require('express')
const helmet = require('helmet')
const prisma = require('../prisma/prisma')

const server = express()

server.use(express.json())
server.use(helmet()) // Pretty strict, might need adjustments for prod

server.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')))

// API
server.get('/api/friends', async (req, res, next) => {
  try {
    const friends = await prisma.Friend.findMany()
    res.json(friends)
  } catch (err) {
    next(err)
  }
})

// SPA
server.get('/*splat', (req, res) => { // In Express 5 '*' won't work
  res.sendFile(path.resolve(__dirname, '..', 'frontend', 'dist', 'index.html'))
})

// Error handler
server.use((err, req, res, next) => {
  res.status(500).json(err.message)
})

module.exports = server

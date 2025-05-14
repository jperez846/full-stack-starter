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

// API - Kudos Boards

// Create a new Kudos Board
server.post('/api/boards', async (req, res, next) => {
  const { title, gifUrl, category, author } = req.body
  try {
    const board = await prisma.kudosBoard.create({
      data: { title, gifUrl, category, author },
    })
    res.status(201).json(board)
  } catch (err) {
    next(err)
  }
})

// Get all Kudos Boards with their cards
// server.get('/api/boards', async (req, res, next) => {
//   try {
//     const boards = await prisma.kudosBoard.findMany({
//       include: { cards: true },
//     })
//     res.json(boards)
//   } catch (err) {
//     next(err)
//   }
// })
// Get all boards or filter by category
// server.get('/api/boards', async (req, res, next) => {
//   try {
//     const { category } = req.query;
//     const boards = category
//       ? await prisma.KudosBoard.findMany({
//           where: {
//             category: category,
//           },
//         })
//       : await prisma.KudosBoard.findMany();

//     res.json(boards);
//   } catch (err) {
//     next(err);
//   }
// });
server.get('/api/boards', async (req, res, next) => {
  try {
    const { category, filter, search } = req.query;

    let whereClause = {};

    if (category) {
      whereClause.category = category;
    }

    if (search) {
      whereClause.title = {
        contains: search,
        mode: 'insensitive',
      };
    }

    let orderByClause = { createdAt: 'desc' };
    let takeCount = undefined;

    if (filter === 'recent') {
      takeCount = 6;
    }

    const boards = await prisma.kudosBoard.findMany({
      where: whereClause,
      orderBy: orderByClause,
      take: takeCount,
      include: {
        cards: true,
      },
    });

    res.json(boards);
  } catch (err) {
    next(err);
  }
});

// Get unique board categories
server.get('/api/categories', async (req, res, next) => {
  try {
    const categories = await prisma.kudosBoard.findMany({
      select: {
        category: true
      },
      distinct: ['category']
    });

    const cleaned = categories
      .map(c => c.category)
      .filter(c => !!c); // remove null or empty categories

    res.json(cleaned);
  } catch (err) {
    next(err);
  }
});

// Delete a Kudos Board (and its cards)
server.delete('/api/boards/:boardId', async (req, res, next) => {
  const { boardId } = req.params
  try {
    await prisma.kudosCard.deleteMany({
      where: { boardId: parseInt(boardId) },
    })

    await prisma.kudosBoard.delete({
      where: { id: parseInt(boardId) },
    })

    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

// API - Kudos Cards
// GET /api/boards/:id
server.get('/api/boards/:id', async (req, res, next) => {
  try {
    const board = await prisma.kudosBoard.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        cards: {
          include: {
            comments: true
          }
        }
      }
    });
    res.json(board);
  } catch (err) {
    next(err);
  }
});

// Add a card to a specific board
server.post('/api/boards/:boardId/cards', async (req, res, next) => {
 
  const { boardId } = req.params
  const { message, gifUrl } = req.body
  try {
    const card = await prisma.kudosCard.create({
      data: {
        message,
        gifUrl,
        board: { connect: { id: parseInt(boardId) } },
      },
    })
    res.status(201).json(card)
  } catch (err) {
    next(err)
  }
})

// Upvote a card
server.patch('/api/cards/:cardId/upvote', async (req, res, next) => {
  const { cardId } = req.params
  try {
    const updated = await prisma.kudosCard.update({
      where: { id: parseInt(cardId) },
      data: { upvotes: { increment: 1 } },
    })
    res.json(updated)
  } catch (err) {
    next(err)
  }
})

// Delete a card
server.delete('/api/cards/:cardId', async (req, res, next) => {
  const { cardId } = req.params
  try {
    await prisma.kudosCard.delete({
      where: { id: parseInt(cardId) },
    })
    res.status(204).end()
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

import express from 'express'
import bodyParser from 'body-parser'

const ideas = express()
ideas.use(bodyParser.json())

// mock database
let memos = [
  {
    id: 0,
    created_date: 'Tue Apr 11 2017 20:30:00 GMT+0100 (BST)',
    title: 'Some awesome memo',
    body: 'Chocolate cake wafer caramels cake fruitcake chupa chups. Topping sesame snaps lemon drops. Jelly beans sweet roll chupa chups gummies.',
  },
  {
    id: 1,
    created_date: 'Tue Apr 11 2017 20:45:00 GMT+0100 (BST)',
    title: 'Another awesome memo',
    body: 'Topping sesame snaps lemon drops. Jelly beans sweet roll chupa chups gummies. Chocolate cake wafer caramels cake fruitcake chupa chups.',
  },
  {
    id: 2,
    created_date: 'Tue Apr 11 2017 21:00:00 GMT+0100 (BST)',
    title: 'Boring memo',
    body: 'Jelly beans sweet roll chupa chups gummies. Chocolate cake wafer caramels cake fruitcake chupa chups. Topping sesame snaps lemon drops.',
  },
  {
    id: 3,
    created_date: 'Tue Apr 11 2017 21:15:00 GMT+0100 (BST)',
    title: 'Interesting memo',
    body: 'Topping sesame snaps lemon drops. Chocolate cake wafer caramels cake fruitcake chupa chups.',
  },
  {
    id: 4,
    created_date: 'Tue Apr 11 2017 21:30:00 GMT+0100 (BST)',
    title: 'Exciting memo',
    body: 'Topping sesame snaps lemon drops. Chocolate cake wafer caramels cake fruitcake chupa chups.',
  },
]

// ids are unique constants so not just length
let currentId = memos.length
function newId() {
  currentId += 1
  return currentId
}

ideas.get('/', (req, res) => {
  res.status(200).send(memos)
})

ideas.get('/new', (req, res) => {
  const memorandums = memos.slice(0)
  const memo = {
    id: newId(),
    created_date: new Date(),
    title: 'Title',
    body: 'Body',
    isNew: true,
  }
  // return new idea
  res.status(200).send(memo)
  // clear isNew property ahead of storing
  delete memo.isNew
  memorandums.push(memo)
  // update mock database
  memos = memorandums
})

ideas.post('/update', (req, res) => {
  const memorandums = memos.slice(0)
  const { id, title, body } = req.body
  // update memo with matching id
  const idea = memorandums.find(memo => {
    return memo.id === id
  })
  idea.title = title
  idea.body = body
  // return updated ideas
  res.status(200).send(memorandums)
  // update mock database
  memos = memorandums
})

ideas.post('/delete', (req, res) => {
  const memorandums = memos.slice(0)
  // delete memo with id
  const deleteId = req.body.id
  const index = memorandums.findIndex(({ id }) => {
    return id === deleteId
  })
  memorandums.splice(index, 1)
  // return updated ideas
  res.status(200).send(memorandums)
  // update mock database
  memos = memorandums
})

export default ideas

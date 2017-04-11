import express from 'express'
import bodyParser from 'body-parser'

const ideas = express()
ideas.use(bodyParser.json())

const memos = [
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

let currentId = memos.length

function newId() {
  currentId += 1
  return currentId
}

ideas.get('/', (req, res) => {
  res.status(200).send(memos)
})

ideas.get('/new', (req, res) => {
  const memo = {
    id: newId(),
    created_date: new Date(),
  }
  memos.push(memo)
  res.status(200).send(memo)
})

ideas.post('/update', (req, res) => {
  const { id, title, body } = req.body
  // update memo with matching id
  const idea = memos.find((memo) => {
    return memo.id === id
  })
  idea.title = title
  idea.body = body
  // return updated ideas
  res.status(200).send(memos)
})

ideas.post('/delete', (req, res) => {
  // delete memo with id
  const deleteId = req.body.id
  const index = ideas.findIndex(({ id }) => {
    return id === deleteId
  })
  ideas.splice(index, 1)
  // return updated ideas
  res.status(200).send(memos)
})

export default ideas

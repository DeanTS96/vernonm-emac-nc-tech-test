import * as express from "express";

export const app = express()

const handleErrors = require('./error.controllers/error.controller');

app.set('json spaces', 2);

app.get('/cards', async (req, res, next) => {
  // respond with a list of cards
})

app.get('/cards/:cardId/:sizeId?', async () => {
  // respond with card by id
})

app.all('/*', async (req, res, next) => {
  next({status: 404, msg: 'Bad api endpoint'})
})

app.use(handleErrors);

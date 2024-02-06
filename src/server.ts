import * as express from "express";

export const app = express()

const handleErrors = require('./error.controllers/error.controller');
const {getCards, getCardById} = require('./controllers/cards.controller');

app.set('json spaces', 2);

app.get('/cards', getCards);
app.get('/cards/:cardId', getCardById);

app.get('/cards/:cardId/:sizeId?', async () => {
  // respond with card by id
})

app.all('/*', async (req, res, next) => {
  next({status: 404, msg: 'Bad api endpoint'})
})

app.use(handleErrors);

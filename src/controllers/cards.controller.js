const {fetchCards, fetchCardById, addCard, removeCard} = require('../models/cards.modals')

async function getCards(req, res, next) {
    try{
        const cards = await fetchCards();
        res.status(200).send(cards)
    }
    catch(err){
        next(err);
    }
}

async function getCardById(req, res, next) {
    try {
        const card = await fetchCardById(req.params);
        res.status(200).send({card: card})
    }
    catch(err) {
        next(err);
    }
}

async function postCard(req, res, next) {
    try {
        const card = await addCard(req.body)
        res.status(201).send({card: card})
    }
    catch(err) {
        next(err);
    }
}

async function deleteCard(req, res, next) {
    try {
        const card = await removeCard(req.params)
        res.status(204).send()
    }
    catch(err) {
        next(err);
    }
}


module.exports = {getCards, getCardById, postCard, deleteCard};
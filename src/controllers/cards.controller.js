const {fetchCards, fetchCardById} = require('../models/cards.modals')

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
    console.log(fetchCardById)
    try {
        const card = await fetchCardById(req.params);
        res.status(200).send({card: card})
    }
    catch(err) {
        next(err);
    }
}

module.exports = {getCards, getCardById};
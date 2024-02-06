const {fetchCards} = require('../models/cards.modals')

async function getCards(req, res, next) {
    try{
        const cards = await fetchCards();
        console.log(cards)
        res.status(200).send(cards)
    }
    catch{
        console.log('err');
    }
}

module.exports = {getCards};
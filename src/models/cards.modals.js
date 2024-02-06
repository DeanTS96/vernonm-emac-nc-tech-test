const cards = require('../data/cards.json')
const templates = require('../data/templates.json')
const {writeFile} = require('fs/promises')

async function fetchCards() {
    const cardsToReturn = cards.map(card => {
        let imageUrl;
        for(const template of templates) {
            if(template.id === card.pages[0].templateId) {
                imageUrl = template.imageUrl
            }
        }
        return {title: card.title, imageUrl, id: card.id}
    })
    return cardsToReturn
}

async function fetchCardById({cardId}) {
    try {
        for(const card of cards) {
            if(card.id === cardId)
            return card
        }
        return Promise.reject({status: 404, msg: 'Card does not exist'})
    }
    catch(err) {
        return err
    }
}

async function addCard(card) {
    try {
        if(!card.title || !card.basePrice || !card.sizes || !card.pages || typeof card.basePrice !== 'number'){
            return Promise.reject({status: 400, msg: 'invalid card data'})
        }
        const mappedCards = cards.map(mappedCard => {
            return +mappedCard.id.split('d')[1]
        })
        const newCardId = mappedCards.sort()[mappedCards.length-1] + 1
        const cardToPush = {id: 'card' + newCardId.toString().padStart(3, 0), ...card}
        cards.push(cardToPush)
        //console.log(__dirname + '../data/cards.json')
        await writeFile(`${__dirname}/../data/cards.json`, JSON.stringify(cards, null, 2));
        return cardToPush
    }
    catch(err) {
        return err
    }
}

module.exports = {fetchCards, fetchCardById, addCard}
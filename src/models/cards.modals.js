const cards = require('../data/cards.json')
const templates = require('../data/templates.json')

function fetchCards() {
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

module.exports = {fetchCards}
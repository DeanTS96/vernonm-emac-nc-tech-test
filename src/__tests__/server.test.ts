import * as request from 'supertest'
import { app } from '../server'

const {writeFile} = require('fs/promises')
const backupCards = require('../cardsbackup.json');

afterAll( async () => {
  await writeFile(`${__dirname}/../data/cards.json`, JSON.stringify(backupCards, null, 2));
});

describe('GET Bad api endpoint', () => {
  test('404: returns status 404 and bad api endpoint', async () => {
    const response = await request(app).get('/endpoint-does-not-exist')
  
    expect(response.status).toBe(404);
    expect(response.body.msg).toEqual('Bad api endpoint');
  })
})

describe('GET cards', () => {
  test('200: returns status code 200 and a list of all cards', async () => {
    const response = await request(app).get('/cards')

    expect(response.status).toBe(200);
    response.body.forEach(card => {
      expect(card).toEqual(expect.objectContaining({
        id: expect.any(String),
        imageUrl: expect.any(String),
        title: expect.any(String),
      }));
    })
  })
})

describe('GET cardById', () => {
  test('200: returns status 200 and requested card', async () => {
    const response = await request(app).get('/cards/card002')
  
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({
        card: {
          id: 'card002',
          title: 'card 2 title',
          sizes: [ 'md' ],
          basePrice: 200,
          pages: expect.any(Array)
      }
    }));
  })
  test('404: returns status 404 when passed a card Id that doesn\'t exist', async () => {
    const response = await request(app).get('/cards/card9999')

    expect(response.status).toBe(404);
    expect(response.body.msg).toBe('Card does not exist');
  })
})

describe('POST cards', () => {
  const cardToPost = {
    "title": "test card title",
    "sizes": [
      "sm",
      "md",
      "gt"
    ],
    "basePrice": 200,
    "pages": [
      {
        "title": "Front Cover",
        "templateId": "template001"
      },
      {
        "title": "Inside Left",
        "templateId": "template002"
      },
      {
        "title": "Inside Right",
        "templateId": "template003"
      },
      {
        "title": "Back Cover",
        "templateId": "template004"
      }
    ]
  }
  const badCard = {
    "sizes": [
      "sm",
      "md",
      "gt"
    ],
    "pages": [
      {
        "title": "Front Cover",
        "templateId": "template001"
      },
      {
        "title": "Inside Left",
        "templateId": "template002"
      },
      {
        "title": "Inside Right",
        "templateId": "template003"
      },
      {
        "title": "Back Cover",
        "templateId": "template004"
      }
    ]
  }
  test('201: returns status 201 and returns the posted card', async () => {
    const response = await request(app).post('/cards').send(cardToPost)

    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.objectContaining({
      card: {
        id: expect.any(String),
        title: expect.any(String),
        sizes: expect.any(Array),
        basePrice: expect.any(Number),
        pages: expect.any(Array)
    }
  }));
  })
  test('400: returns status 400 when sent invalid card data', async () => {
    const response = await request(app).post('/cards').send(badCard)

    expect(response.status).toBe(400);
    expect(response.body.msg).toBe('invalid card data')
  })
})

describe('DELETE cardByID', () => {
  test('204: returns status code 204', async () => {
    const response = await request(app).delete('/cards/card003')
    expect(response.status).toBe(204);
  })
})


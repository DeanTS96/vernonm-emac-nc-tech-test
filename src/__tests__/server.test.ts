import * as request from 'supertest'
import { app } from '../server'

describe('GET Bad api endpoint', () => {
  test('404: returns status 404 and bad api endpoint', async () => {
    const response = await request(app).get('/endpoint-does-not-exist')
  
    expect(response.status).toBe(404);
    expect(response.body.msg).toEqual('Bad api endpoint');
  })
})

describe('GET cards', () => {
  test('200 returns status code 200 and a list of all cards', async () => {
    const response = await request(app).get('/cards')

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(3);
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

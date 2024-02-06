import * as request from 'supertest'
import { app } from '../server'

describe('GET Bad api endpoint', () => {
  test('404: returns status 404 and bad api endpoint', async () => {
    const response = await request(app).get('/endpoint-does-not-exist')
  
    expect(response.status).toBe(404);
    expect(response.body.msg).toEqual('Bad api endpoint');
  })
})
